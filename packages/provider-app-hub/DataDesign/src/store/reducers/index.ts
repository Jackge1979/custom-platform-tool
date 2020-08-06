/*
 * @Author: your name
 * @Date: 2020-08-03 12:24:31
 * @LastEditTime: 2020-08-06 10:26:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \custom-platform-v3-frontend\packages\provider-app-hub\DataManager\src\reducers\index.ts
 */
/** 导入状态值接口定义 */
import { Action, IState } from '@data-design/store/initState';
/** 动作定义 */
const reducer = (
  state: IState | null | undefined,
  action: Action,
) => {
  if (!state) {
    return null;
  }

  switch (action.type) {
    /** 改变表结构页码 */
    case 'triggerStructPager': {
      // console.log(action.structPager);
      const { page, pageSize } = action.structPager;
      // console.log(Object.assign({}, { ...state }, {
      //   strcutPager: {
      //     page,
      //     pageSize
      //   }
      // }));
      return {
        ...state,
        strcutPager: {
          page,
          pageSize
        }
      };
    }
    /** 控制加载动画显示隐藏 */
    case 'triggerLoading': {
      return { ...state, isShowLoading: action.isShowLoading };
    }

    default:
      return state;
  }
};

export default reducer;
