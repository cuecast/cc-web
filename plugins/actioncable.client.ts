import ActionCable from 'actioncable';

export default (context, inject) => {
  let cable = ActionCable.createConsumer("ws://localhost:4000/cable");
  inject('cable', cable);
};
