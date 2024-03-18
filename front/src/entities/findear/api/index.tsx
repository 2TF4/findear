import { FindearAxios } from "@/shared";
import { AxiosResponse } from "axios";

const axios = FindearAxios();

type AcquisitionsType = {
  boardId: number;
  productName: string;
  content: string;
  memberId: number;
  imgUrls: Array<string>;
  acquiredAt: string;
};

type AcquistionsListType = {
  sidoId: string;
  sigunguId: string;
  dongId: string;
  categoryId: number;
  sDate: string;
  eDate: string;
  subCategoryId: number;
  keyword: string;
  pageNo: number;
};

type receiverType = {
  name: string;
  email: string;
  phoneNumber: string;
};
type returnAcquistionsType = {
  boardId: number;
  receiver: receiverType;
};

type LostsType = {
  boardId: number;
  productName: string;
  content: string;
  memberId: number;
  color: Array<string>;
  categoryId: number;
  subCategoryId: number;
  imgUrls: Array<string>;
  lostAt: string;
  suspiciousPlace: string;
  suspiciousRadius: number;
  xPos: number;
  yPos: number;
};

type LostsListType = {
  memberId: number;
  pageNo: number;
};

// 습득물 등록
const registAcquisitions = async (
  data: AcquisitionsType,
  success: (response: AxiosResponse) => void,
  fail: (error: any) => void
) => {
  await axios.post("/acquisitions", data).then(success).catch(fail);
};

// 습득물 리스트 조회
const getAcquisitions = async (
  data: AcquistionsListType,
  success: (response: AxiosResponse) => void,
  fail: (error: any) => void
) => {
  await axios.get("/acquisitions?", { params: data }).then(success).catch(fail);
};

const getAcquisitionsDetail = async (
  boardId: number,
  success: (response: AxiosResponse) => void,
  fail: (error: any) => void
) => {
  await axios.get(`/acquisitions/${boardId}`).then(success).catch(fail);
};

const returnAcquisitions = async (
  data: returnAcquistionsType,
  success: (response: AxiosResponse) => void,
  fail: (error: any) => void
) => {
  await axios
    .post(`/acquisitions/${data.boardId}/return`, data)
    .then(success)
    .catch(fail);
};

const acquistionRollBack = async (
  boardId: number,
  success: (response: AxiosResponse) => void,
  fail: (error: any) => void
) => {
  await axios
    .patch(`/acquisitions/${boardId}/rollback`)
    .then(success)
    .catch(fail);
};

const acquistionPatch = async (
  data: AcquisitionsType,
  success: (response: AxiosResponse) => void,
  fail: (error: any) => void
) => {
  await axios.patch(`/acquisitions/${data.boardId}`).then(success).catch(fail);
};

const deleteAcquisitions = async (
  boardId: number,
  success: (response: AxiosResponse) => void,
  fail: (error: any) => void
) => {
  await axios
    .patch(`/acquisitions/${boardId}/delete`, boardId)
    .then(success)
    .catch(fail);
};

const registLosts = async (
  data: LostsType,
  success: (response: AxiosResponse) => void,
  fail: (error: any) => void
) => {
  await axios.post("/losts", data).then(success).catch(fail);
};

const getLosts = async (
  data: LostsListType,
  success: (response: AxiosResponse) => void,
  fail: (error: any) => void
) => {
  await axios.get("/losts?", { params: data }).then(success).catch(fail);
};

const getLostsDetail = async (
  boardId: number,
  success: (response: AxiosResponse) => void,
  fail: (error: any) => void
) => {
  await axios.get(`/losts/${boardId}`).then(success).catch(fail);
};

const LostsPatch = async (
  data: LostsType,
  success: (response: AxiosResponse) => void,
  fail: (error: any) => void
) => {
  await axios.patch(`/losts/${data.boardId}`, data).then(success).catch(fail);
};

const deleteLosts = async (
  boardId: number,
  success: (response: AxiosResponse) => void,
  fail: (error: any) => void
) => {
  await axios
    .patch(`/losts/${boardId}/delete`, boardId)
    .then(success)
    .catch(fail);
};

export {
  registAcquisitions,
  getAcquisitions,
  getAcquisitionsDetail,
  returnAcquisitions,
  acquistionRollBack,
  registLosts,
  getLosts,
  getLostsDetail,
  deleteLosts,
  LostsPatch,
  acquistionPatch,
  deleteAcquisitions,
};
