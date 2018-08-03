if (opt.method === 'post') {
    axiosOpt.data = opt.payload
  } else if (opt.method === 'get') {
    axiosOpt.params = opt.payload
  }
  if (opt.withFile) {
    Object.assign(axiosOpt, { headers: {
      'Content-Type': 'multipart/form-data'
    }})
  }

  // 全局请求的 loading，当请求 300 ms 后还没返回，才会出现 loading
  const timer = setTimeout(() => {
    store.dispatch('showLoading', {
      text: '加载数据中'
    })
  }, 300)

  try {
    // 开始请求
    const result = await axios(axiosOpt)
    // 如果 300 ms 还没到，就取消定时器
    clearTimeout(timer)
    store.dispatch('closeLoading')

    if (result.status === 200 && result.statusText === 'OK') {
      if (result.data.success) {
        return result.data.results || true
      } else {
        // 请求失败的 toast
        store.dispatch('showAlert', {
          type: 'error',
          text: `请求失败${result.data.message ? `,信息：${result.data.message}`: ''}`
        })
        return false
      }
    } else {
      return false
    }
  } catch(e) {
    clearInterval(timer)
    // 请求失败的 toast
    store.dispatch('closeLoading')
    store.dispatch('showAlert', {
      type: 'error',
      text: '请求失败'
    })
    return false
  }
