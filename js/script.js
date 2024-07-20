"use strict";

const POST_ADDRESS = "https://zipcloud.ibsnet.co.jp/api/search";

/**
 * 郵便番号から住所を取得する
 * @param {*} zipCode
 * @returns {Promise}
 */
async function getAddress(zipCode) {
  const url = `${POST_ADDRESS}?zipcode=${zipCode}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results?.[0]; // results が存在しない場合に undefined を返す
}

// イベントリスナーの設定
document
  .getElementById("zip_code")
  .addEventListener("change", async (event) => {
    const zipCode = event.target.value;
    const addressData = await getAddress(zipCode);

    if (!addressData) {
      alert("該当する住所が見つかりませんでした");
      return;
    } else {
      document.getElementById("prefecture").value = addressData.address1;
      document.getElementById("city").value = addressData.address2;
      document.getElementById("town").value = addressData.address3;
    }
  });
