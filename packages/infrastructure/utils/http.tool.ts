/*
 * @Author: your name
 * @Date: 2020-07-30 15:44:00
 * @LastEditTime: 2020-08-19 15:25:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \custom-platform-v3-frontend\packages\infrastructure\utils\http.tool.ts
 */

// import { useHistory } from 'react-router-dom';
// const history = useHistory();
/** 弹出提示框组件 */
import { notification } from 'antd';

/** 弹窗参数类型约束 */
export type alertMsgArgs={
  type?:'open'|'success'|'warning'|'info'|'error';
  title:string;
  desc?:string;
  duration?:number;
}
/**
 * 弹出通知提醒框
 * @param type  弹窗类型
 * @param title  标题
 * @param desc 详细描述
 * @param duration 提醒框显示时间
 */
export function alertMsg(params:alertMsgArgs) {
  const {
    title, type, desc, duration
  } = params;
  const args = {
    message: title || '',
    description: desc || '',
    duration: duration || 3,
    showIcon: true
  };

  notification[type || 'open'](args);
  return args;
}
/**
* 操作提示
*/
const Msg = {
  success: (title) => alertMsg({ title, type: 'success' }),
  warning: (title) => alertMsg({ title, type: 'warning' }),
  error: (title) => alertMsg({ title, type: 'error' }),
};

export { Msg };

/** 登陆超时编码 */
export const logoutCode = [600];

/** 网络响应正常处理流程 */
export const resHandler = (res) => {
  const { status, data } = res;
  if (status === 200) {
    /** 数据不存在 */
    if (!data) {
    // fetchLog(res)
      const statusText = "数据不存在";
      return Promise.reject(statusText);
    }
    const { code, msg } = data;
    /** 非正确业务码返回 */
    if (code && code !== '00000') {
      alertMsg({ type: 'error', title: `请求错误 ${code}`, desc: msg });
      fetchLog(res);
      return Promise.reject(msg);
    }
    /** 进入正常流程 */
    return Promise.resolve(res);
  }
  /** 必须有返回信息,这样写return Promise.reject()会触发ts报警 */
  return Promise.reject(res);
};

/** 网络错误代码 */
const netCodeMsg = {
  400: '错误请求',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求错误,未找到该资源',
  405: '请求方法未允许',
  408: '请求超时',
  500: '服务器端出错',
  501: '网络未实现',
  502: '网络错误',
  503: '服务不可用',
  504: '网络超时',
  505: 'http版本不支持该请求',
};
/**
 * 网络异常处理程序
 */
export const errHandler = (error) => {
  const { response = {} } = error;
  const { status, statusText } = response;
  /** 错误信息 */
  const errMsg = netCodeMsg[status] || statusText;

  /** 捕获错误-为日志上报预留 */
  fetchLog(error);
  /** 登录超时跳转到登陆页 */
  if (logoutCode.includes(status)) {
    Msg.error('登录已过期，请重新登录');
    /** 清除所有的登录态信息 */
    globalThis.sessionStorage.clear();
    // useHistory().replace('/login');
    globalThis.location.href = `${globalThis.location.origin}/#/login`;
    return Promise.reject(errMsg);
  }
  // console.log(error);
  // 弹出网络错误提示框
  alertMsg({ type: 'error', title: `请求错误 ${status}`, desc: errMsg });

  return Promise.reject(error);
};
/**
 * 捕获日志
 */
export function fetchLog(log) {
  // console.log(log);
}
