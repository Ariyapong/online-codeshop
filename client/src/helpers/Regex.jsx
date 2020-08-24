export const PWDPOLICY = /(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z].{5,}/;
export const EMAILFILTER = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const EMAILPOLICY = /\S+@\S+\.\S+/;
export const NUMBERFILTER = /[^0-9]+$/;
export const NAMEPOLICYWITHDASH = /[^a-zA-Zก-๏\s,/-]/g;
export const NAMEPOLICY = /[^a-zA-Zก-๏\s]/g;
