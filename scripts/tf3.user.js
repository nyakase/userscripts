// ==UserScript==
// @name         Tumblr Fortress 3
// @namespace    https://nineplus.sh
// @version      2025-06-16
// @description  try to crit the world!
// @author       Hakase
// @match        https://www.tumblr.com/**
// @icon         https://www.tumblr.com/favicon.ico
// @grant        GM_addStyle
// @grant        unsafeWindow
// @sandbox      JavaScript
// ==/UserScript==

/**
Tumblr Fortress 3 is a port of Tumblr Fortress 2 from New XKit. New XKit (C) 2013 STUDIOXENIX.
Compatible with modern Tumblr and the pre-2023 userstyle (https://userstyles.world/style/11286).
Please do not contact Tumblr or the New XKit developers for help with using Tumblr Fortress 3.
This script was developed outside of Tumblr and has no relation to Tumblr Inc.

It also needs access to unsafeWindow to read technical Tumblr data. It is not actually unsafe
to use Tumblr Fortress 3, you can review the code below this notice if you wish. Refer to
https://github.com/tumblr/docs/blob/master/web-platform.md for more information.
**/

(async function() {
    'use strict';

    const CSSmap = await unsafeWindow.tumblr.getCssMap();
    const nodeHasClass = (node, className) => CSSmap[className].find((mapClassName) => node.classList.contains(mapClassName));
    const nodeHasClasses = (node, classNames) => classNames.every((className) => nodeHasClass(node, className));
    const classToStyle = (className) => `:is(${CSSmap[className].map((mapClassName) => `.${mapClassName}`).join(", ")})`;

    const IDfromURL = (url) => url.match(/\/[a-z-0-9]+\/(\d+)/)[1];

    // make header more comfortable with having a larger image inside it
    GM.addStyle(`
.tf3ized ${classToStyle("subheader")} ${classToStyle("info")} {
display: flex;
  align-items: center;
  gap: 5px;
  }

  .tf3ized ${classToStyle("reblogParent")} {
  align-items: center;
  gap: 5px;
  }
`)

    // prevent icons from misaligning stuff + bonus styling depending on post type
    // invert icons if user is using a dark palette, which does have the unfortunate side effect of turning flames blue and such
    GM.addStyle(`
  .tf3icon {
  height: 1.5em;
  }
  ${classToStyle("reblogParent")} .tf3icon {
  height: 1em;
  }
  .tf3icon.crit {
  background: transparent url("https://78.media.tumblr.com/becd0641fa16830002d33282e29cdd3a/tumblr_inline_p9ajigzKbk1r0r06s_75sq.png") 0 0/100% 100% no-repeat;
  }
  .tf3icon.flipped {
  transform: scaleX(-1)
  }
  body:is(.palette--darkMode, .palette--lowContrastClassic, .palette--cybernetic, .palette--vampire, .palette--pumpkin, .palette--gothRave) .tf3icon {
  filter: invert(1);
  }
  [data-testid="scroll-container"][style*="--blog-title-color:"] .tf3icon {
  filter: invert(0);
  }
  `)

    const icons = ["https://78.media.tumblr.com/08983ee062302cbde916a2a076a7282a/tumblr_inline_p9ajmrVMwn1r0r06s_100.png", "https://78.media.tumblr.com/e2aaaaca5a95e93af2cb1197d7810858/tumblr_inline_p9ajmrVLTg1r0r06s_100.png", "https://78.media.tumblr.com/727341e2d160e12eb6f66f7e48e7f80e/tumblr_inline_p9ajmsNeEe1r0r06s_75sq.png", "https://78.media.tumblr.com/5cc30d86ccf38301a7ea0bf3cbfeead3/tumblr_inline_p9ajmsa2Lv1r0r06s_75sq.png", "https://78.media.tumblr.com/237a48fff26eb8cd04359905b449a06d/tumblr_inline_p9ajmt1guB1r0r06s_75sq.png", "https://78.media.tumblr.com/9e9eab0bff9456c812414332477e339d/tumblr_inline_p9ajmtaT0K1r0r06s_250.png", "https://78.media.tumblr.com/fcea924b25cef858112477c2055c731c/tumblr_inline_p9ajmu6W5K1r0r06s_100.png", "https://78.media.tumblr.com/d036dd8f4275daf433cd5de221ba71ea/tumblr_inline_p9ajmuQAV91r0r06s_100.png", "https://78.media.tumblr.com/1387ab384afb07631cc6cb5628f90760/tumblr_inline_p9ajmvAuhL1r0r06s_100.png", "https://78.media.tumblr.com/21fb35fcd1233f6effa3836570438033/tumblr_inline_p9ajmvkBqv1r0r06s_100.png", "https://78.media.tumblr.com/f5a0ae913a763078612e5df8d1aaa2e7/tumblr_inline_p9ajmwMU971r0r06s_75sq.png", "https://78.media.tumblr.com/9991e1ec07039bfe6a1b9a02bdbfa1a6/tumblr_inline_p9ajmwZyMX1r0r06s_250.png", "https://78.media.tumblr.com/c3fecc61e374663d8d1093e13dcd0ce7/tumblr_inline_p9ajmx29M11r0r06s_75sq.png", "https://78.media.tumblr.com/0411a817ef1d26fba707cc6ae2fe247f/tumblr_inline_p9ajmx9qXj1r0r06s_100.png", "https://78.media.tumblr.com/ac10051a80a8a4ac284cb21a3cd9b930/tumblr_inline_p9ajmxX7201r0r06s_75sq.png", "https://78.media.tumblr.com/21a9c2d85240c13e650d98feffc0cb05/tumblr_inline_p9ajmy27gh1r0r06s_75sq.png", "https://78.media.tumblr.com/1eb536d95b8fe807a8b85be06888eaba/tumblr_inline_p9ajmyKCj61r0r06s_100.png", "https://78.media.tumblr.com/01cf6ab45dda6ec7e91fbf1e4a88d50f/tumblr_inline_p9ajmzji4I1r0r06s_75sq.png", "https://78.media.tumblr.com/41fa7e686b05c2f11cc411b794e7d98f/tumblr_inline_p9ajmzzFYo1r0r06s_75sq.png", "https://78.media.tumblr.com/d0f4c752b142bbeb393da974a6d3bf5d/tumblr_inline_p9ajn0kUfy1r0r06s_100.png", "https://78.media.tumblr.com/edb435384ac1bf435cb2be31cb42d563/tumblr_inline_p9ajn0f6vV1r0r06s_100.png", "https://78.media.tumblr.com/c8872f6c50d38723fbe907205890a4af/tumblr_inline_p9ajn0VIh71r0r06s_75sq.png", "https://78.media.tumblr.com/5afcb335a583259b5e0042d76e285d20/tumblr_inline_p9ajn1oTBd1r0r06s_250.png", "https://78.media.tumblr.com/82cf7ba5448eddf32eb52c6b24476dff/tumblr_inline_p9ajn1o9841r0r06s_75sq.png", "https://78.media.tumblr.com/2d0a28e34feecaa722c9d76b2c884e84/tumblr_inline_p9ajn174iS1r0r06s_100.png", "https://78.media.tumblr.com/97339b4526388867120df77bce2f46b0/tumblr_inline_p9ajn2f9td1r0r06s_100.png", "https://78.media.tumblr.com/73d08f766241fca74d8927fe0d0cf6c5/tumblr_inline_p9ajn21bTg1r0r06s_75sq.png", "https://78.media.tumblr.com/18085a3b43e005dfeaa22a8f8a5cd64c/tumblr_inline_p9ajn3hF4x1r0r06s_75sq.png", "https://78.media.tumblr.com/0b63616b2baba024698172e9c7558032/tumblr_inline_p9ajn3HjJJ1r0r06s_250.png", "https://78.media.tumblr.com/f1cebd267c525df1d5cb41a0cbb9b804/tumblr_inline_p9ajn4o3ga1r0r06s_100.png", "https://78.media.tumblr.com/05f388ee5fd6c40dc851bf8389ba67f1/tumblr_inline_p9ajn6NHRS1r0r06s_75sq.png", "https://78.media.tumblr.com/21d20b536ec29cf7fe80eb21f556b4e4/tumblr_inline_p9ajn6QeZK1r0r06s_75sq.png", "https://78.media.tumblr.com/271df0a8e12d452f7c06439749ae66f2/tumblr_inline_p9ajn6jBKr1r0r06s_100.png", "https://78.media.tumblr.com/2d7992b84b55992017c1d99fc3a508ca/tumblr_inline_p9ajn77Ge61r0r06s_100.png", "https://78.media.tumblr.com/9056dce98aa9ac6f05be3e120dacaa38/tumblr_inline_p9ajn7UHxB1r0r06s_250.png", "https://78.media.tumblr.com/cb8e3cec81b8fc62dddafee97d8ce8ce/tumblr_inline_p9ajn8Sp5u1r0r06s_75sq.png", "https://78.media.tumblr.com/6f1966383dbf96b6240c8c20f84e1440/tumblr_inline_p9ajn8GF8X1r0r06s_100.png", "https://78.media.tumblr.com/4c56a1d5f7330e727d7036fb11c0c98d/tumblr_inline_p9ajn9FAE21r0r06s_100.png", "https://78.media.tumblr.com/90a2cb7a4ae1cb3a9164e2183a078e38/tumblr_inline_p9ajn9GDxb1r0r06s_100.png", "https://78.media.tumblr.com/aca139cd2a076204d85370aca78e5786/tumblr_inline_p9ajnaDYpF1r0r06s_75sq.png", "https://78.media.tumblr.com/10ee410c9a801b764ab3f92a1385348b/tumblr_inline_p9ajnajlVA1r0r06s_75sq.png", "https://78.media.tumblr.com/a24f428d886c158d8978f99bdbf541bc/tumblr_inline_p9ajnbo3ih1r0r06s_75sq.png", "https://78.media.tumblr.com/ebde993f66d007a0336f247a45177c9f/tumblr_inline_p9ajnbuWb31r0r06s_100.png", "https://78.media.tumblr.com/cd68d801cbe33d8476f8820d6767410f/tumblr_inline_p9ajnc5HWE1r0r06s_100.png", "https://78.media.tumblr.com/76b5afe2bb5546cce1cf271d22637a06/tumblr_inline_p9ajndVNmj1r0r06s_100.png", "https://78.media.tumblr.com/7f7eb40656e3b31ac6de66142d9c46df/tumblr_inline_p9ajndpGN21r0r06s_75sq.png", "https://78.media.tumblr.com/525f5ad0979a8df5e14ff50cf797a1fc/tumblr_inline_p9ajlj3V1z1r0r06s_75sq.png", "https://78.media.tumblr.com/d0579ab634cc7a0dce4cf45e9f34b546/tumblr_inline_p9ajlkMVw61r0r06s_75sq.png", "https://78.media.tumblr.com/974ec853b83fad39def0c8246896617c/tumblr_inline_p9ajlldLJg1r0r06s_75sq.png", "https://78.media.tumblr.com/d74a08bb672dceb2fb696a2b9893f52b/tumblr_inline_p9ajllKxf91r0r06s_75sq.png", "https://78.media.tumblr.com/4735f9158bfb77f607164bb6506a48c8/tumblr_inline_p9ajll5SCD1r0r06s_100.png", "https://78.media.tumblr.com/d243b915c6d14a09b25e674acaa037d9/tumblr_inline_p9ajlmWalV1r0r06s_100.png", "https://78.media.tumblr.com/a940bb4120194d0162689f80593991e7/tumblr_inline_p9ajlmlBF11r0r06s_100.png", "https://78.media.tumblr.com/38240b05c623bc841d5eac2eae1b1324/tumblr_inline_p9ajln6YZU1r0r06s_100.png", "https://78.media.tumblr.com/38d8d4e33f3d2415ee69fede7821dcd6/tumblr_inline_p9ajlnCkQe1r0r06s_100.png", "https://78.media.tumblr.com/3cb0de2dfad481753893da55dec7927d/tumblr_inline_p9ajlnaMym1r0r06s_100.png", "https://78.media.tumblr.com/86c23bd6b4b7c685c7389c91981fb6a8/tumblr_inline_p9ajloj3PY1r0r06s_250.png", "https://78.media.tumblr.com/1149e833b9304d19b4d22a3c0c8f81fa/tumblr_inline_p9ajlpspgL1r0r06s_75sq.png", "https://78.media.tumblr.com/fed74a6f561750cf45d4564fe7e12d35/tumblr_inline_p9ajlqRJIn1r0r06s_75sq.png", "https://78.media.tumblr.com/20b26287d97ada6dd3d9ffb0e16808f5/tumblr_inline_p9ajlqHt8U1r0r06s_100.png", "https://78.media.tumblr.com/20465b73b6fdb9ee180c34073d24ce4a/tumblr_inline_p9ajlrq8LB1r0r06s_75sq.png", "https://78.media.tumblr.com/b7066458d07d516787ab0ee3b1d56f54/tumblr_inline_p9ajlrDADY1r0r06s_75sq.png", "https://78.media.tumblr.com/98343c268c1dfc2a331038fe3da0b64e/tumblr_inline_p9ajlr0bXk1r0r06s_75sq.png", "https://78.media.tumblr.com/3cabd6905459a1c9a7585da4256d1e31/tumblr_inline_p9ajlshhTv1r0r06s_100.png", "https://78.media.tumblr.com/944a3b62f744df54da3fea0b8729111c/tumblr_inline_p9ajlsMLMD1r0r06s_100.png", "https://78.media.tumblr.com/904f6ba26259782e41d8ab17866e0a48/tumblr_inline_p9ajltkp9y1r0r06s_100.png", "https://78.media.tumblr.com/6aef67bd399e16ccd5f5f3a36312a590/tumblr_inline_p9ajltVZzc1r0r06s_100.png", "https://78.media.tumblr.com/87d07b0c262cc5b2487583dc6e8698c7/tumblr_inline_p9ajluAXtI1r0r06s_250.png", "https://78.media.tumblr.com/8730e3c10fd80484ef4c40e1e94d2bd3/tumblr_inline_p9ajlusbOX1r0r06s_100.png", "https://78.media.tumblr.com/889651cd749df6f414a67772888d5896/tumblr_inline_p9ajlvpqNF1r0r06s_75sq.png", "https://78.media.tumblr.com/02f6f49836da236134aec14a417feaee/tumblr_inline_p9ajlvPgxg1r0r06s_250.png", "https://78.media.tumblr.com/0142fac4e22dbd3cfcf61a22982996a1/tumblr_inline_p9ajlvBuvr1r0r06s_100.png", "https://78.media.tumblr.com/aca21697fde821a8b9b694ae83222313/tumblr_inline_p9ajlwsVf61r0r06s_250.png", "https://78.media.tumblr.com/83d8c8cf8620eda0a5c51ee68cce1ffd/tumblr_inline_p9ajlxIvjX1r0r06s_75sq.png", "https://78.media.tumblr.com/fe9a5e7a8e017cd0ab4743d669054670/tumblr_inline_p9ajlxHNc91r0r06s_250.png", "https://78.media.tumblr.com/b989e00c945bf868fc7d104f0857e5f0/tumblr_inline_p9ajlyh8Sv1r0r06s_250.png", "https://78.media.tumblr.com/1e054b366aa17b91afd41507fba56cb4/tumblr_inline_p9ajlzoghs1r0r06s_100.png", "https://78.media.tumblr.com/f8736dfd30b105c0d08a51eb93a68e47/tumblr_inline_p9ajlzevBC1r0r06s_75sq.png", "https://78.media.tumblr.com/7557809d6c8f0bee6313ab6949920c82/tumblr_inline_p9ajm0g3k91r0r06s_100.png", "https://78.media.tumblr.com/78bde09ed3e4fe493f4117565017846a/tumblr_inline_p9ajm0Gl8Q1r0r06s_100.png", "https://78.media.tumblr.com/a9700f0c78edd13c28a15ea2d262483f/tumblr_inline_p9ajm0SkGJ1r0r06s_75sq.png", "https://78.media.tumblr.com/e9bdf440a90acd5509ff2a40d4b60647/tumblr_inline_p9ajm10fR21r0r06s_250.png", "https://78.media.tumblr.com/527e8b76feaa994227c0353a419fb18a/tumblr_inline_p9ajm1RTlR1r0r06s_100.png", "https://78.media.tumblr.com/37c0f69d105e2ba4e37bc6440b369578/tumblr_inline_p9ajm2EpTS1r0r06s_100.png", "https://78.media.tumblr.com/e29d68c21c8e9fe3cf41870ab8c88244/tumblr_inline_p9ajm2E1we1r0r06s_250.png", "https://78.media.tumblr.com/377ec486049d473981ccf61ef86c86fd/tumblr_inline_p9ajm3X2fV1r0r06s_100.png", "https://78.media.tumblr.com/9012213aeb5ea3c6ee7c964cc43bae1c/tumblr_inline_p9ajm3Z3rQ1r0r06s_75sq.png", "https://78.media.tumblr.com/3dc964f4b8daa586cb7011f1e7fa590f/tumblr_inline_p9ajm4KlUb1r0r06s_250.png", "https://78.media.tumblr.com/b3d0ff0bb5681214c720333e51157981/tumblr_inline_p9ajm4sCww1r0r06s_100.png", "https://78.media.tumblr.com/44283ba31d8312ba32eae2b2c859b26c/tumblr_inline_p9ajm4f7si1r0r06s_100.png", "https://78.media.tumblr.com/b57694c8669ec0aff8bd1ca6033d6b3c/tumblr_inline_p9ajm5f2LH1r0r06s_75sq.png", "https://78.media.tumblr.com/a347df0fe246888d0f840549bbd3981d/tumblr_inline_p9ajm5X5hX1r0r06s_75sq.png", "https://78.media.tumblr.com/40ab51eac400a2538af33b7f0c6ff497/tumblr_inline_p9ajm6zo731r0r06s_75sq.png", "https://78.media.tumblr.com/9db2c5a301e14680e253689b02e4089c/tumblr_inline_p9ajm7Rzyq1r0r06s_100.png", "https://78.media.tumblr.com/f5fbf92ba940b7b3e4bab16001c6b7e2/tumblr_inline_p9ajm7XIzw1r0r06s_100.png", "https://78.media.tumblr.com/5a2e1ef4142ef881721a5bfe3f724688/tumblr_inline_p9ajm9t5dU1r0r06s_75sq.png", "https://78.media.tumblr.com/924641caa6036c12ea82bd5bad1f70d5/tumblr_inline_p9ajl3FPFa1r0r06s_75sq.png", "https://78.media.tumblr.com/a6c5a3528bd215d87864ada888ac5fbc/tumblr_inline_p9ajl3akke1r0r06s_75sq.png", "https://78.media.tumblr.com/0a35a9f77d3723b5de6f92e7199cb231/tumblr_inline_p9ajl52ovt1r0r06s_100.png", "https://78.media.tumblr.com/3bdec0ce2af4b5c1e1847a42da9e970f/tumblr_inline_p9ajl5OXuv1r0r06s_75sq.png", "https://78.media.tumblr.com/fbc140cbfd29e598203b2ae3e3e12567/tumblr_inline_p9ajl5w0VL1r0r06s_100.png", "https://78.media.tumblr.com/529a6a5bcd5faa066690bb7963e4bdab/tumblr_inline_p9ajl6eKki1r0r06s_100.png", "https://78.media.tumblr.com/e296ada9c2c875429304384547119f43/tumblr_inline_p9ajl6Kj2d1r0r06s_100.png", "https://78.media.tumblr.com/b9cea98c72a64441170aacfbf7f65afe/tumblr_inline_p9ajl7b3Um1r0r06s_100.png", "https://78.media.tumblr.com/e225de597f2b4adb58d9f1311d973a2d/tumblr_inline_p9ajl7hhtM1r0r06s_100.png", "https://78.media.tumblr.com/5f2d5e9a39ec83aceb21e118701fa452/tumblr_inline_p9ajl7Djt71r0r06s_75sq.png", "https://78.media.tumblr.com/7d0ef6aecb31eb4337bdbcfb0303c2d5/tumblr_inline_p9ajl8fKoG1r0r06s_100.png", "https://78.media.tumblr.com/30c101a90ac034cbe0b855ea58071a3e/tumblr_inline_p9ajl84Y0D1r0r06s_100.png", "https://78.media.tumblr.com/8c4b9c8943e5c870bf9fc3947bd4c429/tumblr_inline_p9ajl8RXXp1r0r06s_75sq.png", "https://78.media.tumblr.com/022296fc9feca1215f751f73ad69d0c0/tumblr_inline_p9ajl9ppkU1r0r06s_75sq.png", "https://78.media.tumblr.com/db29cc7cd0ff24e30636db0e5bbdc91a/tumblr_inline_p9ajl9HHhU1r0r06s_250.png", "https://78.media.tumblr.com/6e20c75093691c79dd22c51f9369ecfb/tumblr_inline_p9ajla0yKJ1r0r06s_75sq.png", "https://78.media.tumblr.com/d1af0c9734a80e89bf814a2fbc364918/tumblr_inline_p9ajlbwPLH1r0r06s_100.png", "https://78.media.tumblr.com/c3a82e437e03b52a5af42afbb58f250c/tumblr_inline_p9ajlc5agH1r0r06s_100.png", "https://78.media.tumblr.com/6bb85f6cc09de43df40f063b74f9242b/tumblr_inline_p9ajlchEfq1r0r06s_75sq.png", "https://78.media.tumblr.com/b4b6c1104ec0be61a9de7646d3d871e9/tumblr_inline_p9ajlchrXT1r0r06s_75sq.png", "https://78.media.tumblr.com/c2df887fbe272175c821c667d60bed29/tumblr_inline_p9ajldLVNx1r0r06s_250.png", "https://78.media.tumblr.com/b7066f90610d48b65b5cedbe90c21cfa/tumblr_inline_p9ajldP8xY1r0r06s_75sq.png", "https://78.media.tumblr.com/465f0e004dce06211ae030afe4d4c0a8/tumblr_inline_p9ajleUVkr1r0r06s_100.png", "https://78.media.tumblr.com/e51c680711087e593f6929bcd5cba762/tumblr_inline_p9ajlfjncc1r0r06s_75sq.png", "https://78.media.tumblr.com/803c65a947ac11d0ab2d37a2674531e2/tumblr_inline_p9ajlfguzb1r0r06s_100.png", "https://78.media.tumblr.com/3eda6ab30a6f1fafbf250c027214f333/tumblr_inline_p9ajlgrwwI1r0r06s_250.png", "https://78.media.tumblr.com/e51c6b800efc527b1836f24f33a5a363/tumblr_inline_p9ajlgYCrq1r0r06s_100.png", "https://78.media.tumblr.com/1e2c40190cb8d0bb106c9bc39add44d5/tumblr_inline_p9ajlhbSFI1r0r06s_75sq.png", "https://78.media.tumblr.com/ab3eaae69e5a0e4a28b9af74d6ebd8db/tumblr_inline_p9ajlhXD8T1r0r06s_75sq.png", "https://78.media.tumblr.com/011c6b95b28c7d8d086ded971d86cc81/tumblr_inline_p9ajlhLzhL1r0r06s_100.png", "https://78.media.tumblr.com/49083c2bb72b91427293ec91316dbaef/tumblr_inline_p9ajliMid71r0r06s_100.png", "https://78.media.tumblr.com/e5f613b0de5c3e8dcbe701b14ca9fe8c/tumblr_inline_p9ajli3W1T1r0r06s_100.png", "https://78.media.tumblr.com/ef8f63a8542d9790be49b9f0e893395e/tumblr_inline_p9ajljpv2z1r0r06s_75sq.png", "https://78.media.tumblr.com/0d43dffe2ea12ca3d5238abf9632dee7/tumblr_inline_p9ajljIBix1r0r06s_100.png", "https://78.media.tumblr.com/822fd3450ae273cf449ee2619faf8cf5/tumblr_inline_p9ajljk6Dc1r0r06s_100.png", "https://78.media.tumblr.com/a4e0dc4f93532fe141981bdcb88415f3/tumblr_inline_p9ajlkJl9v1r0r06s_75sq.png", "https://78.media.tumblr.com/943893f0b37d79ccee00e5d202b7be00/tumblr_inline_p9ajlku5qc1r0r06s_250.png", "https://78.media.tumblr.com/0ffe3a004058c2bda5bc5adf7067e3a0/tumblr_inline_p9ajllmYSU1r0r06s_100.png", "https://78.media.tumblr.com/19f54044a284cbe8d43dc80e3495febb/tumblr_inline_p9ajllEY7M1r0r06s_75sq.png", "https://78.media.tumblr.com/f3db2be78d9bf6fc0717d73bdc4fddc7/tumblr_inline_p9ajllX8Fy1r0r06s_250.png", "https://78.media.tumblr.com/c7cd4eb6ffdfd739821aff87c6ce1941/tumblr_inline_p9ajlm3Pyp1r0r06s_250.png", "https://78.media.tumblr.com/9519bc63745244b50fec5a6389f1e4ab/tumblr_inline_p9ajlmTM3k1r0r06s_250.png", "https://78.media.tumblr.com/0eedc45cf50d076e7a79f2b54d358939/tumblr_inline_p9ajlnnpOh1r0r06s_75sq.png", "https://78.media.tumblr.com/dc3c8bbaf773aba5886a5074b67904d6/tumblr_inline_p9ajlohPrK1r0r06s_100.png", "https://78.media.tumblr.com/5088176ba66d4552c21d35715b5a3c8a/tumblr_inline_p9ajlowrnw1r0r06s_100.png", "https://78.media.tumblr.com/8f042fb3f4e20503c5c5099d7c8ed4bc/tumblr_inline_p9ajlp2SKL1r0r06s_75sq.png", "https://78.media.tumblr.com/462e5ee110e1aa00f584881d7b840805/tumblr_inline_p9ajlpIeAP1r0r06s_250.png", "https://78.media.tumblr.com/bce5152c08eaba6b4152dd8edfc777d4/tumblr_inline_p9ajlpvDGA1r0r06s_250.png", "https://78.media.tumblr.com/f041ef81ae585f9955b5458b3cee8aae/tumblr_inline_p9ajlqA8N41r0r06s_250.png", "https://78.media.tumblr.com/02c080075f7c74e0e561323dbc472e5a/tumblr_inline_p9ajlqp2a31r0r06s_250.png", "https://78.media.tumblr.com/955bbab5620d74b1cd50192e4e684c4c/tumblr_inline_p9aji6V7iC1r0r06s_75sq.png", "https://78.media.tumblr.com/1813f39ea65c46c02fd7bc9c721bb082/tumblr_inline_p9aji6zG521r0r06s_75sq.png", "https://78.media.tumblr.com/9fb4c8acd1d809eeeb61901c888a02e1/tumblr_inline_p9aji8Z5yh1r0r06s_75sq.png", "https://78.media.tumblr.com/e471b3cf3007fbba2b501beea13afdbd/tumblr_inline_p9aji8N5l41r0r06s_75sq.png", "https://78.media.tumblr.com/e7104ccdbd2aebdbf406a9ebb3b88da4/tumblr_inline_p9aji8wAAV1r0r06s_100.png", "https://78.media.tumblr.com/e13810c146bd48748b667623bd8cb69a/tumblr_inline_p9ajiaTJaD1r0r06s_250.png", "https://78.media.tumblr.com/cc719ec9cbe0aa0caf5d559a69a0acb7/tumblr_inline_p9ajiaphix1r0r06s_100.png", "https://78.media.tumblr.com/e5064c2d2d1363660967e7453e822d13/tumblr_inline_p9ajiaJ3zV1r0r06s_75sq.png", "https://78.media.tumblr.com/5e01641c525e48721fbad2d232ca24bf/tumblr_inline_p9ajibAT7r1r0r06s_75sq.png", "https://78.media.tumblr.com/db3416c606f3de2cb85e9e09a696142d/tumblr_inline_p9ajicgEwb1r0r06s_250.png", "https://78.media.tumblr.com/95a12a512e5807fc2e0e1a712519923e/tumblr_inline_p9ajico6dj1r0r06s_75sq.png", "https://78.media.tumblr.com/faf8ab99643d778e420722c326eddc25/tumblr_inline_p9ajidFszO1r0r06s_75sq.png", "https://78.media.tumblr.com/8ec47230408ea2e33f5621e611bb32d3/tumblr_inline_p9ajifIAXG1r0r06s_75sq.png", "https://78.media.tumblr.com/5e85e81160402aa024c1cc322f6d7b8d/tumblr_inline_p9ajifZrsT1r0r06s_250.png", "https://78.media.tumblr.com/669c848271b67f663800a9b337d90f3e/tumblr_inline_p9ajig20Uj1r0r06s_100.png", "https://78.media.tumblr.com/3089d9bf3e99c4c9d0997ffd0aa90e3d/tumblr_inline_p9ajiheIS21r0r06s_100.png", "https://78.media.tumblr.com/256cc4fafcb43e71007c82423dba1885/tumblr_inline_p9ajih4LrY1r0r06s_75sq.png", "https://78.media.tumblr.com/3ad45f8a6727a79d6c0864ce4efdc058/tumblr_inline_p9ajiieyB91r0r06s_250.png", "https://78.media.tumblr.com/50e48bb39f2e8dcafe282a95e0baf255/tumblr_inline_p9ajiiDh1R1r0r06s_100.png", "https://78.media.tumblr.com/0e47035310f2f722d3e5a11661eac931/tumblr_inline_p9ajijDKbR1r0r06s_75sq.png", "https://78.media.tumblr.com/19727c20f8db5a378516b333fb6f7b8f/tumblr_inline_p9ajijdMP11r0r06s_75sq.png", "https://78.media.tumblr.com/3f24bac416c337c14733939466ddb828/tumblr_inline_p9ajijMEfM1r0r06s_75sq.png", "https://78.media.tumblr.com/b561248dbda35170408e4ddc60945ec5/tumblr_inline_p9ajikgqG51r0r06s_100.png", "https://78.media.tumblr.com/aeba1552786b43bcdb590715daa0337e/tumblr_inline_p9ajikxdZh1r0r06s_100.png", "https://78.media.tumblr.com/4eec82e3b351682c481ab0e464829e27/tumblr_inline_p9ajil4Kon1r0r06s_100.png", "https://78.media.tumblr.com/400d3b5d0e1ee61ae448534c9a777809/tumblr_inline_p9ajilmE401r0r06s_100.png", "https://78.media.tumblr.com/9c52cb89bbfbb229daed7c01a1c53159/tumblr_inline_p9ajimCdU91r0r06s_100.png", "https://78.media.tumblr.com/d2f70f5bfc5858f5166100e329c5659a/tumblr_inline_p9ajinjsEv1r0r06s_250.png", "https://78.media.tumblr.com/5fe7fe03692119a8eb3d901cb84d56d9/tumblr_inline_p9ajioQrWk1r0r06s_250.png", "https://78.media.tumblr.com/f6531430f8672f61b198e33ac734f58d/tumblr_inline_p9ajioqDfb1r0r06s_100.png", "https://78.media.tumblr.com/bb0533de7aad2a0d8951fdc5d83abd02/tumblr_inline_p9ajioZViI1r0r06s_100.png", "https://78.media.tumblr.com/0d5d20909951f07810333b5397bcd79b/tumblr_inline_p9ajipz2nG1r0r06s_75sq.png", "https://78.media.tumblr.com/0e5159e867a024df0175658039121b5b/tumblr_inline_p9ajipVrSl1r0r06s_100.png", "https://78.media.tumblr.com/e0c5e952a533493c1671cc609b247405/tumblr_inline_p9ajiqZtsh1r0r06s_75sq.png", "https://78.media.tumblr.com/443beca44c966d00ccac5ecbb4a5b4aa/tumblr_inline_p9ajiqAtAx1r0r06s_75sq.png", "https://78.media.tumblr.com/44be0dd0e768cc90e1c6c4b1f797c73c/tumblr_inline_p9ajirtMG51r0r06s_100.png", "https://78.media.tumblr.com/23da749daa7124b05c6dc2c9da298a75/tumblr_inline_p9ajirrTfm1r0r06s_75sq.png", "https://78.media.tumblr.com/f78b6385c2f922d128a15be15665fea0/tumblr_inline_p9ajirggBN1r0r06s_250.png", "https://78.media.tumblr.com/8ac64bdc4201c7ca04cf6191511fa96e/tumblr_inline_p9ajis08WF1r0r06s_100.png", "https://78.media.tumblr.com/b9c2c35e9e33c2236e4704278111cf6f/tumblr_inline_p9ajitVWsj1r0r06s_250.png", "https://78.media.tumblr.com/60d13eaa1f6f5081291722549dd20445/tumblr_inline_p9ajitPIHq1r0r06s_100.png", "https://78.media.tumblr.com/992c0f232622db8f2547e723e327053d/tumblr_inline_p9ajiu7WIK1r0r06s_100.png", "https://78.media.tumblr.com/3898fb7f7d40192c859aae080e929fb0/tumblr_inline_p9ajiv76ZE1r0r06s_100.png", "https://78.media.tumblr.com/f7d5334b6cdd7889fe1be5436c3d62ac/tumblr_inline_p9ajivSno41r0r06s_100.png", "https://78.media.tumblr.com/0d20626747638ee03f2e1cf3fff3dd69/tumblr_inline_p9ajiwFe7Z1r0r06s_75sq.png", "https://78.media.tumblr.com/b79ecf4fd8c8d21547b37b9e0bc6b7ae/tumblr_inline_p9ajiwIyBP1r0r06s_100.png", "https://78.media.tumblr.com/e0585648c1e79c3f1c09166d32f40802/tumblr_inline_p9ajix6kOz1r0r06s_75sq.png", "https://78.media.tumblr.com/5a0ed39b8a75df13d6a8e1951400e5b3/tumblr_inline_p9ajix40uk1r0r06s_100.png"];

    document.querySelectorAll(`[data-id]${classToStyle("listTimelineObject")}`).forEach(node => tf3izePost(node))

    const observer = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // tf3ize reblogs in the notes list when it's updated
                /* on the first load, mutations for individual notes are not emitted for some reason,
                   only a couple weird empty divs at the start and end of the list :( */
                if(mutation.target.parentNode.getAttribute("data-testid") == "notes-root") mutation.target.parentNode.querySelectorAll(
                        "[data-testid=reblog-note-block]:not(.tf3ized)").forEach(note => tf3izeNote(note));

                mutation.addedNodes.forEach(node => {
                    if(!node || !node.classList) return;

                    // tf3ize posts on the dash
                    if(nodeHasClass(node, "listTimelineObject") && node.getAttribute("data-id")) tf3izePost(node);
                    // tf3ize posts loaded onto a blog
                    if(nodeHasClasses(node, ["cell", "isVisible"]) && node.querySelector(`[data-id]${classToStyle("listTimelineObject")}`))
                        tf3izePost(node.querySelector(`[data-id]${classToStyle("listTimelineObject")}`));
                    // add crits to posts
                    if(node.classList.contains("xkit-mutual-icon")) {
                        node.parentNode.parentNode.parentNode.querySelector(".tf3icon")?.classList.add("crit");
                        node.style.display = "none";
                    }
                });
            }
        }
    });

    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);

    function makeKillicon({seed, flipped = false, mutual = false }) {
        const tf3Icon = document.createElement("img");
        tf3Icon.className = "tf3icon";

        tf3Icon.src = icons[seed % icons.length];
        tf3Icon.alt = "reblogged";

        if(mutual) tf3Icon.classList.add("crit");
        if(flipped) tf3Icon.classList.add("flipped");

        return tf3Icon;
    }

    function tf3izePost(postNode) {
        if(postNode.classList.contains("tf3ized")) return;

        const headerNode = postNode.querySelector(classToStyle("userBlock"));
        const rebloggedNode = headerNode.querySelector(classToStyle("info"));
        const reblogSourceNode = rebloggedNode.querySelector(classToStyle("targetWrapperInline"));

        const tf3Icon = makeKillicon({
            seed: postNode.getAttribute("data-id"),
            mutual: headerNode.querySelector(".xkit-mutual-icon"),
            flipped: !reblogSourceNode
        });
        tf3Icon.onload = () => rebloggedNode.firstChild.remove();

        if(!reblogSourceNode) {
            rebloggedNode.appendChild(tf3Icon);
        } else {
            rebloggedNode.insertBefore(tf3Icon, reblogSourceNode);
        }

        postNode.classList.add("tf3ized");
    }

    function tf3izeNote(noteNode) {
        if(noteNode.classList.contains("tf3ized")) return;

        const rebloggedNode = noteNode.querySelector(classToStyle("reblogParent"));
        const rebloggerNode = noteNode.querySelector(`${classToStyle("targetWrapperBlock")} ${classToStyle("blogLink")}`);
        const reblogSourceNode = rebloggedNode.querySelector(classToStyle("blogLink"));

        const tf3Icon = makeKillicon({seed: IDfromURL(rebloggerNode.href)});
        tf3Icon.onload = () => rebloggedNode.firstChild.remove();
        rebloggedNode.insertBefore(tf3Icon, reblogSourceNode);

        noteNode.classList.add("tf3ized");
    }
})();


/**
New XKit, and as a result, Tumblr Fortress 3, are free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version. Tumblr Fortress 3 is
distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU.org website for more
information at https://www.gnu.org/licenses/gpl.html.

The original Tumblr Fortress 2 source code may be found at the following GitHub repository:
https://github.com/new-xkit/XKit/blob/a5e04019eeab363c508a6944de507a64aad34152/Extensions/tf2_reblogs.js
**/
