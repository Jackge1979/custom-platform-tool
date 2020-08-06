import React, { FC } from 'react';
/** 通过useMappedState在store 和组件之间，建立起连接 */
import { useMappedState, useDispatch } from 'redux-react-hook';

// 全局样式入口
import '@provider-app/data-design/src/styles/index.less';

/** react-router工具暴露方法 */
import {
  Switch, Route, Link, BrowserRouter
} from 'react-router-dom';

import { Menu, Spin } from 'antd';
/** 路由配置 */
import ROUTES from '@provider-app/data-design/src/routes';
/** 动态渲染图标组件 */
import IconComp from '@provider-app/data-design/src/routes/IconComp';

/** 模拟数据 */
import { treeData as test } from '@provider-app/data-design/src/mock';
/** 全局加载动画控制变量 */
const mapState = (state) => ({
  isShowLoading: state.isShowLoading,
  treeData: state.treeData
});

const App: FC = () => {
  const dispatch = useDispatch();
  /** 设置默认选中和打开的菜单 */
  const defaultSelectedKeys = ROUTES[0].key;
  /** 全局加载动画设置 */
  const { isShowLoading, treeData } = useMappedState(mapState);
  console.log({ isShowLoading, treeData, test });
  /** 点击菜单绑定事件 */
  const handleClick = (e) => {
    dispatch({ type: 'triggerLoading', isShowLoading: !isShowLoading });

    if (isShowLoading) {
      dispatch({ type: 'setTreeData', treeData: test });
    } else {
      dispatch({ type: 'setTreeData', treeData: [] });
    }
    // console.log('占位 click ', e.key);
    // setTimeout(() => {
    //   dispatch({ type: 'triggerLoading', isShowLoading: !isShowLoading });
    // }, 1000);
  };

  return (

    < BrowserRouter >
      <h1>

        {isShowLoading ? '1' : '0'} times
      </h1>
      {/* <div className={isShowLoading ? 'loading' : 'hide'}>
        <Spin tip="加载中..." size="large" />
      </div> */}

      <div className="app-container">
        <Menu
          theme="dark"
          mode="inline"
          className="menu"
          onClick={handleClick}
          style={{ width: 256, paddingTop: 20 }}
          defaultSelectedKeys={[defaultSelectedKeys]}
          defaultOpenKeys={[defaultSelectedKeys]}
        >
          {ROUTES.map((route) => (
            <Menu.Item key={route.key}>
              <Link to={route.link}>
                {/* 动态渲染图标 */}
                <IconComp type={route.icon} className="icon" />
                <b>{route.text}</b>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
        <main>
          <Switch>
            {/* Switch里面不能直接嵌套div,因为渲染出来的不是HTML节点,需要用Fragment包裹一下 */}
            <>
              <div style={{ background: '#fff', padding: 24, height: '100%' }}>
                {ROUTES.map((route) => (
                  <Route exact key={route.key} path={route.link} component={route.component} />
                ))}
              </div>
            </>
          </Switch>
        </main>
      </div>
    </BrowserRouter >

  );
};

export default App;
