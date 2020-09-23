/* eslint no-useless-escape:0 import/prefer-default-export:0 */
import { parse } from 'querystring';

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const parsePathToOpenKeys = (path: string) => {
  const openKeys: string[] = [];
  path.split("/").reduce((previousValue, currentValue) => {
    if (currentValue) {
      openKeys.push(`${previousValue}/${currentValue}`);
      return `${previousValue}/${currentValue}`;
    }
    return "";
  }, '');
  return openKeys;
};

interface INode {
  id?: string;
  pid?: string;
  children?: string;
}
interface IConfig {
  id?: string
  pid?: string
  children?: string

  mapping?: any;
  attribute?: any;

}
/**
 * constrcut 方法
 * 根据提供的 id, pid 和 children 将一个个节点构建成一棵或者多棵树
 * @param nodes 节点对象
 * @param config 配置对象
 */
export function construct(nodes: INode[], config?: IConfig) {
  const id = config && config.id || 'id';
  const pid = config && config.pid || 'pid';
  const children = config && config.children || 'children';
  const mapping = config && config.mapping || {};
  const attribute = config && config.attribute || {};

  const idMap = {};
  const jsonTree: IConfig[] = [];

  nodes.forEach((node) => { node && (idMap[node[id]] = node); });
  nodes.forEach((node) => {
    if (node) {
      Object.keys(mapping).map((item) => {
        node[item] = node[mapping[item]];
        return node;
      });
      Object.keys(attribute).map((item) => {
        node[item] = attribute[item];
        return node;
      });
      const parent = idMap[node[pid]];
      if (parent) {
        !parent[children] && (parent[children] = []);
        parent[children].push(node);
      } else {
        jsonTree.push(node);
      }
    }
  });
  return jsonTree;
}
