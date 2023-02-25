import newEventEmitter from 'events';

export const EventEmitter = new newEventEmitter();

// create event emitters for this project (declare the function that you should use in  your code using window object)
export function createEventEmitters() {
  // Event Emitter for flash message
  window.flash = (params) => EventEmitter.emit('flash', params);
  // Event Emitter for modal
  window.modal = (params) => EventEmitter.emit('modal', params);
}

export const createDiv = async (id: string) => {
  try {
    let div = document.createElement('div');
    div.id = id;
    div.style.display = 'none';
    await document.getElementsByTagName('body')[0].appendChild(div);
    return div;
  } catch (err) {
    // console.log(err);
    return null;
  }
};

export const removeDiv = (element: HTMLDivElement) => {
  try {
    element.parentNode.removeChild(element);
  } catch (err) {
    // console.log(err);
  }
};
