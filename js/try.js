function test() {
  try {
    console.log(1)
    // return 'from try'
    throw new Error('throw')
  } catch (e) {
    // console.log(e.message)
    return 'from catch'
  } finally {
    console.log(2)
    // return 'from finally'
  }
}
test()
