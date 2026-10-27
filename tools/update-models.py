"""Build the public Chinese passenger-car series catalog used by the site.

Source: Autohome's public, no-login A-Z model index pages.  The script makes
only 26 sequential requests, stores factual fields (series name, brand,
manufacturer, public guide-price range and source URL), and deliberately does
not copy images, reviews, articles or account data.

Run from the project root:
    python car-matcher/tools/update-models.py
"""

from __future__ import annotations

import argparse
import html
import json
import re
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path


SOURCE_TEMPLATE = "https://www.autohome.com.cn/grade/carhtml/{letter}.html"
SOURCE_HOME = "https://www.autohome.com.cn/grade/carhtml/"
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36"
)
OUTPUT = Path(__file__).resolve().parents[1] / "models.generated.js"

DL_RE = re.compile(
    r"<dl\s+id=[\"'](?P<brand_id>\d+)[\"'][^>]*>(?P<body>.*?)</dl>",
    re.IGNORECASE | re.DOTALL,
)
DT_RE = re.compile(r"<dt[^>]*>(?P<body>.*?)</dt>", re.IGNORECASE | re.DOTALL)
DD_RE = re.compile(r"<dd[^>]*>(?P<body>.*?)</dd>", re.IGNORECASE | re.DOTALL)
DIV_LINK_RE = re.compile(
    r"<div[^>]*>\s*<a[^>]*>(?P<text>.*?)</a>\s*</div>",
    re.IGNORECASE | re.DOTALL,
)
TOKEN_RE = re.compile(
    r"(?P<maker><div\s+class=[\"']h3-tit[\"'][^>]*>.*?</div>)"
    r"|(?P<series><li\s+id=[\"']s(?P<series_id>\d+)[\"'][^>]*>.*?</li>)",
    re.IGNORECASE | re.DOTALL,
)
LINK_TEXT_RE = re.compile(r"<a[^>]*>(?P<text>.*?)</a>", re.IGNORECASE | re.DOTALL)
H4_RE = re.compile(r"<h4[^>]*>(?P<body>.*?)</h4>", re.IGNORECASE | re.DOTALL)
PRICE_RE = re.compile(
    r"指导价\s*[：:]\s*<a\s+class=[\"']red[\"'][^>]*>\s*"
    r"(?P<low>\d+(?:\.\d+)?)\s*(?:-\s*(?P<high>\d+(?:\.\d+)?))?\s*万\s*</a>",
    re.IGNORECASE | re.DOTALL,
)
TAG_RE = re.compile(r"<[^>]+>")


def clean_text(value: str) -> str:
    return re.sub(r"\s+", " ", html.unescape(TAG_RE.sub("", value))).strip()


def fetch(url: str, retries: int = 3) -> str:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": USER_AGENT, "Referer": "https://www.autohome.com.cn/"},
    )
    last_error: Exception | None = None
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(request, timeout=35) as response:
                raw = response.read()
                # The current pages are UTF-8.  Fall back defensively for older mirrors.
                try:
                    return raw.decode("utf-8")
                except UnicodeDecodeError:
                    return raw.decode("gb18030", errors="replace")
        except (urllib.error.URLError, TimeoutError) as error:
            last_error = error
            if attempt + 1 < retries:
                time.sleep(1.5 * (attempt + 1))
    raise RuntimeError(f"Failed to fetch {url}: {last_error}")


def extract_link_text(fragment: str) -> str:
    match = LINK_TEXT_RE.search(fragment)
    return clean_text(match.group("text")) if match else ""


def parse_letter(document: str, initial: str, source_url: str) -> list[dict]:
    rows: list[dict] = []
    for dl_match in DL_RE.finditer(document):
        block = dl_match.group("body")
        dt_match = DT_RE.search(block)
        dd_match = DD_RE.search(block)
        if not dt_match or not dd_match:
            continue

        brand_match = DIV_LINK_RE.search(dt_match.group("body"))
        brand = clean_text(brand_match.group("text")) if brand_match else ""
        if not brand:
            continue

        manufacturer = ""
        for token in TOKEN_RE.finditer(dd_match.group("body")):
            if token.group("maker"):
                manufacturer = extract_link_text(token.group("maker"))
                continue

            series_fragment = token.group("series")
            h4_match = H4_RE.search(series_fragment)
            price_match = PRICE_RE.search(series_fragment)
            if not h4_match or not price_match:
                # Public index marks historical/ceased series as grey links and
                # normally shows no current guide price.  Requiring the red guide
                # price is the conservative, reproducible "currently listed" rule.
                continue
            if re.search(r"class=[\"'][^\"']*greylink", h4_match.group("body"), re.I):
                continue

            name = extract_link_text(h4_match.group("body"))
            if not name:
                continue
            low = float(price_match.group("low"))
            high = float(price_match.group("high") or price_match.group("low"))
            series_id = int(token.group("series_id"))
            rows.append(
                {
                    "id": series_id,
                    "name": name,
                    "brand": brand,
                    "manufacturer": manufacturer or brand,
                    "priceMin": low,
                    "priceMax": high,
                    "url": f"https://www.autohome.com.cn/{series_id}/",
                    "initial": initial,
                    "sourcePage": source_url,
                }
            )
    return rows


def render_js(rows: list[dict], fetched_at: str) -> str:
    brands = {row["brand"] for row in rows}
    manufacturers = {row["manufacturer"] for row in rows}
    meta = {
        "sourceName": "汽车之家公开车型索引",
        "sourceUrl": SOURCE_HOME,
        "scope": "A-Z 公开索引中有当前指导价且未标记为灰色历史链接的车系",
        "fetchedAt": fetched_at,
        "seriesCount": len(rows),
        "brandCount": len(brands),
        "manufacturerCount": len(manufacturers),
        "fields": [
            "id",
            "name",
            "brand",
            "manufacturer",
            "priceMin",
            "priceMax",
            "url",
            "initial",
            "sourcePage",
        ],
    }
    meta_json = json.dumps(meta, ensure_ascii=False, separators=(",", ":"))
    rows_json = json.dumps(rows, ensure_ascii=False, separators=(",", ":"))
    return (
        "/* Generated by tools/update-models.py. Do not edit manually. */\n"
        f"window.PUBLIC_VEHICLE_CATALOG_META={meta_json};\n"
        f"window.PUBLIC_VEHICLE_CATALOG={rows_json};\n"
    )


def self_test() -> None:
    sample = """
    <dl id="33"><dt><div><a>奥迪</a></div></dt><dd>
      <div class="h3-tit"><a>一汽奥迪</a></div>
      <li id="s7413"><h4><a href="//www.autohome.com.cn/7413/">奥迪Q6L e-tron</a></h4>
      <div>指导价：<a class="red">36.98-39.98万</a></div></li>
      <li id="s19"><h4><a class="greylink">奥迪A4</a></h4>指导价：暂无</li>
    </dd></dl>
    """
    rows = parse_letter(sample, "A", "self-test")
    assert len(rows) == 1, rows
    assert rows[0]["id"] == 7413 and rows[0]["brand"] == "奥迪", rows
    assert rows[0]["manufacturer"] == "一汽奥迪", rows
    assert rows[0]["priceMin"] == 36.98 and rows[0]["priceMax"] == 39.98, rows


def main() -> int:
    parser = argparse.ArgumentParser(description="Update the public A-Z vehicle-series catalog")
    parser.add_argument("--delay", type=float, default=0.4, help="delay between public pages")
    parser.add_argument("--letters", default="ABCDEFGHIJKLMNOPQRSTUVWXYZ", help="letters to fetch")
    parser.add_argument("--output", type=Path, default=OUTPUT)
    parser.add_argument("--self-test", action="store_true", help="test the public-page parser offline")
    args = parser.parse_args()

    if args.self_test:
        self_test()
        print("Parser self-test passed")
        return 0

    catalog: dict[int, dict] = {}
    letters = "".join(dict.fromkeys(args.letters.upper()))
    for index, letter in enumerate(letters, start=1):
        if not ("A" <= letter <= "Z"):
            parser.error(f"invalid letter: {letter}")
        url = SOURCE_TEMPLATE.format(letter=letter)
        print(f"[{index:02d}/{len(letters):02d}] {url}", flush=True)
        document = fetch(url)
        parsed = parse_letter(document, letter, url)
        for row in parsed:
            catalog[row["id"]] = row
        print(f"        {len(parsed)} current priced series", flush=True)
        if index < len(letters):
            time.sleep(max(0.0, args.delay))

    rows = sorted(catalog.values(), key=lambda item: (item["brand"], item["name"], item["id"]))
    if len(letters) == 26 and len(rows) < 300:
        raise RuntimeError(f"Only {len(rows)} rows parsed; refusing to replace a full catalog")

    china_standard_time = timezone(timedelta(hours=8), name="Asia/Shanghai")
    fetched_at = datetime.now(china_standard_time).replace(microsecond=0).isoformat()
    output = args.output.resolve()
    output.parent.mkdir(parents=True, exist_ok=True)
    temporary = output.with_suffix(output.suffix + ".tmp")
    temporary.write_text(render_js(rows, fetched_at), encoding="utf-8", newline="\n")
    temporary.replace(output)

    print(
        f"Wrote {len(rows)} series / {len({r['brand'] for r in rows})} brands "
        f"to {output}",
        flush=True,
    )
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except KeyboardInterrupt:
        print("Cancelled", file=sys.stderr)
        raise SystemExit(130)

