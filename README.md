# 佐藤医院 Webサイト（静的HTML/CSS）

完成デザイン `reference/iwaguchi４.png` を視覚的な基準にし、`reference/掲載原稿.docx` の文章を転記して作成した、VS Codeで直接編集できる教材用Webサイトです。React、npm、ビルド処理は不要です。

## すぐに表示する方法

1. このZIPを展開し、VS Codeの「ファイル」→「フォルダーを開く」で `sato-clinic` フォルダーを選択してください。
2. `index.html` を右クリックし、Live Server拡張機能の **Open with Live Server** を実行します。拡張機能がなくても `index.html` をブラウザーで直接開けます。
3. お知らせの各項目を選ぶと `news.html` の該当本文へ移動します。

## ファイルの説明

| ファイル | 用途 |
| --- | --- |
| `index.html` | トップページ全文。各セクションに番号付きコメントがあります。 |
| `news.html` | トップページからリンクする、お知らせ全文の補助ページ。 |
| `css/style.css` | 配色、フォント、配置、装飾、スマートフォン向けスタイル。 |
| `js/main.js` | スマートフォンのメニュー開閉、診療科目写真の5秒ごとの切り替え、マウス移動時の落ち葉アニメーション。 |
| `assets/images/` | 提供されたJPG画像素材。 |
| `assets/illustrations/` | 診療内容4種類のSVGアイコンなど。 |
| `reference/` | 元デザインPNG、もう1点の参考PNG、掲載原稿DOCX（表示には使いません）。 |

## 主な編集箇所

- **文章**：`index.html` の各 `<!-- 01. ... -->` ～ `<!-- 10. ... -->` を編集します。診療内容は `<article class="service-card">` 単位、スタッフは `<article class="staff-card">` 単位で追加・削除できます。
- **色・文字サイズ**：`css/style.css` 冒頭の `:root` で `--color-bg`、`--color-green`、`--font-size-body` 等を変更します。
- **画像**：`src="assets/images/ファイル名.jpg"` を差し替えます。最上段の樹木はCSSの `.hero`、院長挨拶は `firstView.jpg`、当院については `hospital_2_watercolor.jpg` を使用しています。
- **診療時間**：`index.html` の `id="timetable-top"` と `id="timetable-bottom"` にある `<table>` を修正します。**上・下の2か所を必ず同時に変更**してください。`●` は診療、`／` は休診です。スマートフォンでは表の内部だけ左右にスクロールします。
- **お知らせ**：トップの `<ul class="news-list">` の見出しと、`news.html` の `<article class="news-article">` の本文を対応させて修正します。リンク先の `id` と `href` は一致させてください。
- **ナビゲーション**：`index.html` と `news.html` の `<nav class="primary-navigation">` を編集します。
- **草花の装飾**：今回は添付されたPNG素材を採用しています。`assets/images/` に保存済みです。横罫線は `.section-heading::before` / `::after`、縦罫線は `.side-botanical` 系のCSSで調整します。診療内容のアイコンは `assets/illustrations/*.svg` です。


## 今回追加した装飾素材の実装

追加された9点の装飾・ロゴ画像は、名前を整理して `assets/images/` に収録しました。元データはリサイズ・トリミングせず格納しています。

| 添付画像 | 保存名 | HTML/CSS上の用途 |
| --- | --- | --- |
| `logo(5).png` | `clinic-logo.png` | ヘッダーとフッターの画像ロゴ。文字の重複を防ぐため旧HTML文字ロゴを置換 |
| `line1left.png` | `heading-floral-left.png` | セクション見出しの左側罫線（CSS `::before`） |
| `line1lright.png` | `heading-floral-right.png` | セクション見出しの右側罫線（CSS `::after`） |
| `sato_left_border_top(1).png` | `side-vine-top.png` | 左右の縦罫線の上端 |
| `sato_left_border_repeat(1).png` | `side-vine-repeat.png` | 左右の縦罫線の長さを調整する繰り返し部分 |
| `sato_left_border_bottom(1).png` | `side-vine-bottom.png` | 左右の縦罫線の下端 |
| `Line5.png` | `staff-wreath-green.png` | スタッフ写真の植物リース装飾 |
| `ピンクの花咲く水彩リーフフレーム-2.png` | `staff-wreath-pink.png` | スタッフ写真の植物リース装飾 |
| `淡い白花の水彩ボタニカルリース-1.png` | `staff-wreath-white.png` | スタッフ写真の植物リース装飾 |

### 左右対称の縦罫線（重要）

`index.html` / `news.html` の最初の方にある2つの `.side-botanical` を使用します。左・右とも**同じ3枚のPNG**を参照します。右の反転は `css/style.css` に明示しています：

```css
.side-botanical--right {
  left: auto;
  right: 0;
  transform: scaleX(-1); /* 左側と正確に左右対称 */
}
```

`side-vine-top.png` → `side-vine-repeat.png`（縦に繰り返す）→ `side-vine-bottom.png` の順番で配置します。`--border-art-width` は左右共通の表示幅です。Webページ全体と一緒にスクロールし、本文レイアウトを絶対配置しません。

### 横罫線とスタッフ装飾

`css/style.css` の `.section-heading::before` と `::after` の `background-image` を変えると見出し両側の草花が変更できます。元の罫線画像は改変せず使用し、横幅は `max-width`、高さは `height` で調整できます。

スタッフ写真の装飾は `.staff-image-frame::after` の背景画像です。写真は独立した `<img>` なので、スタッフの写真だけ変更しても植物装飾は残ります。

## 素材の対応

- `hospital_2_watercolor.jpg`：トップ画像、当院について
- `firstView.jpg`：院長挨拶（患者様と向き合う診察の画像）
- `sato_taro2.jpg`：院長 佐藤 太郎
- `suzuki_mari2.jpg`：看護師長 鈴木 真理
- `takahashi_yumi2.jpg`：臨床検査技師 高橋 由美
- `yamamoto_hana2.jpg`：医療事務 山本 花
- `hospital_4_watercolor.jpg`、`hospital_6_watercolor.jpg`、`hospital_7_watercolor.jpg`、`hospital_8_watercolor.jpg`：ページ下部の関連写真
- `hospital_1_watercolor.jpg`、`hospital_3_watercolor.jpg`、`hospital_5_watercolor.jpg`：将来のページ追加時に使える予備写真
- `reference/ChatGPT 画像 2026年11月6日 15_02_40.png`、`reference/iwaguchi４.png`：参考資料のみ。Webページ内には貼り付けていません。

## 公開前の重要事項

1. **掲載テキストは提供原稿のままです。** 原稿には文面の改変禁止が指定されています。変更時は医院側の承諾を得てください。
2. **所在地・電話・メールは教材用の架空情報です。** `tel:`、`mailto:` リンクは指定のダミー値で実装してあるため、実運用前に正しいものへ置換してください。
3. **正しい地図は未設定です。** 原稿の住所が架空のため、Googleマップの座標や地図URLを推測せず、アクセス欄を明示的な地図プレースホルダーにしています。実際の所在地が決まってから `.map-placeholder` を正式な埋め込み地図へ置き換えてください。
4. **休診日・予防接種・年末年始の案内内容は原稿どおりです。** 2025年11月20日付の確定原稿を元にしており、現在の診療状況を検証したものではありません。掲載前に最新の運用情報と整合するか必ず確認してください。
5. **別ページの本文は増設していません。** 今回はトップページ＋リンク先の「お知らせ」のみを実装しました。「診療内容」「当院について」「よくあるご質問」等の詳細ページは将来増設可能な構造です。

## チェック結果

- セマンティックHTML：ヘッダー、ナビゲーション、メイン、セクション、記事、フッターを分離
- 画像：独立したJPG/SVG素材を使用、ファイル参照先確認済み
- レスポンシブ：1440px、390px、320pxで表示検査。いずれもページ本体の横はみ出しなし
- 診療時間表：HTMLの `table` として2か所に実装
- JavaScript：スマートフォンのハンバーガーメニュー、Escで閉じる処理あり
- 確認範囲：Chromium相当のレンダリング検証、お知らせ詳細5件と画像リンクの検証。機種別・ブラウザー別の網羅的な実機検証は未実施


## 両脇の植物罫線：参考画像に合わせたサイズ変更

`css/style.css` 冒頭の `.side-botanical` の `--border-art-width` を変更すると、
左・右（左右反転）、上部・中央繰り返し・下部のすべてのサイズが連動します。
画像の右側に大きな透明余白があるため、実際の植物は設定幅の約3割です。
この改訂版では PCは最大148px、スマートフォンは約48〜58px とし、
参考画像のように葉とピンクの花が判読できる太さに近づけました。
右側の罫線は `.side-botanical--right {transform:scaleX(-1)}` です。
文字やコンテンツは変更していません。
