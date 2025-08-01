// src/utils/eventBus.ts
import mitt from 'mitt';

type Events = {
  'custom-event': any; // bạn có thể định nghĩa nhiều loại event ở đây
};

const emitter = mitt<Events>();

export default emitter;
