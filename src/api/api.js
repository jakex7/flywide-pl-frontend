const base = "https://api.flywide.pl/";
// const base = "http://localhost:8080/";

const serverInfo = `${base}server/info`;
const pageNews = `${base}server/posts`;

const generateCode = `${base}codes/create`;
const verifyCode = `${base}codes/verify`;

const allRanks = `${base}ranks/all`;
const assignedRanks = `${base}ranks/assigned`;
const addRanks = `${base}ranks/add`;
const delRanks = `${base}ranks/del`;

export const gaCode = "UA-165390514-1";

export { serverInfo, generateCode, verifyCode, allRanks, addRanks, delRanks, assignedRanks, pageNews };
export default base;