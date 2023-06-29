export interface Channel {
  /**
   * 属性的名字
   */
  name: string;
  /**
   * values 里面是否需要该属性对应的值
   */
  optional?: boolean;
  /**
   * 需要使用的比例尺
   */
  scale?: any;
}

export type ChannelOptions = Record<string, Channel>;

export function createChannel({ name, optional = true, scale }: Channel) {
  return { name, optional, scale };
}

export function createChannels(options: ChannelOptions = {}) {
  return {
    x: createChannel({ name: 'x', optional: false }), // x 坐标
    y: createChannel({ name: 'y', optional: false }), // y 坐标
    stroke: createChannel({ name: 'stroke' }), // 边框颜色
    fill: createChannel({ name: 'fill' }), // 填充颜色
    ...options,
  };
}
