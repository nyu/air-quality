export default (data) => ({
  ...data,
  when: new Date(data.when).toLocaleTimeString('en-US')
})