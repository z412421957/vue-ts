
export interface State {
    // 弹出框是否允许点击空白处关闭
    closeOnModal: boolean;
    // 弹出框关闭时是否摧毁
    destroyOnClose: boolean;
}

const initState: State = {
    closeOnModal: false,
    destroyOnClose: true
};

export default {
  state: initState
};
