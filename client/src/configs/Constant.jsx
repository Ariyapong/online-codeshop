export const config = {

	// API Dev
	url: "https://dev.chococrm.com:4747",

	//API Prod.
	// url:"https://brand-api.chococrm.com",

	//Important !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! get reward key Prod.
		// awardCoupon: "EC6ZB2",
		// awardLabel: "PBF1RD",
		// awardAll: "L44B8H",

	//Important !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! get reward key Dev.
		awardCoupon: "K7M5RC",
		awardLabel: "3XCCHU",
		awardAll: "SBIWXJ",

	// primiryColor: '#A41F2C',
	textColor: '#9F1230',
	lineColor: '#A2A2A2',
	primeryColr: "#1B4297",
	secondaryColr: "#F26422",
	thirdColr: "#CCCBCB",
	forthColr: "#707070",
	mainTextColr: "#fff"
};
export const loadingBlock = {
	position: 'absolute !important',
	zIndex: '100',
	top: '50% !important',
	left: '50% !important',
	transform: 'translate(-50%, -50%)',
	// height: 'unset !important',
	// width: 'unset !important',
	// color: '#fff'
};

export const errorPopup = {
	type: "error",
	text: "เกิดข้อผิดพลาด",
	closeBTN: true
}

export const successPopup = {
	text: "สำเร็จ!",
	closeBTN: true,
}

export const infoPopup = {
	text: "สำเร็จ!",
	showConfirmBtn: true,
	showCancelBtn: true,
	confirmBtnText: "ตกลง",
	calcelBtnText: "ยกเลิก"
}