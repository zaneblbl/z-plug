/**
 * 
 * 连接github Api
 */

//ajax封装
function background_ajax(type, url, params) {
  return new Promise((resolve, reject) => {
    try {
      chrome.extension.sendMessage({
        'url': url,
        'type': type,
        'params': params
      }, function (ret) {
        if (ret) {
          resolve(ret);
        }
      });
    } catch (e) {
      reject(e)
    } finally {

    }
  })

}

// 增
function addToGitHub(userName, accessToken, path, msg) {
  let url = `https://api.github.com/repos/${userName}/${path.substring(0, path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}?access_token=${accessToken}`
  let params = {}
  return new Promise((resolve, reject) => {
    // // 需要获取文件sha
    params.message = `create${msg['title']}`
    // content内容需转成base64
    params.content = common.Base64.encode(JSON.stringify(msg))
    background_ajax('put', url, JSON.stringify(params)).then(res => {
      resolve(res)
    }, fail => {
      reject(fail)
    })
  })

}

// 查
function getFromGitHub(userName, accessToken, path) {
  return new Promise((resolve, reject) => {
    let url = `https://api.github.com/repos/${userName}/${path.substring(0, path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}?access_token=${accessToken}`
    background_ajax('get', url).then(res => {
      let result = common.Base64.decode(res.content)
      resolve(result)
    }, fail => {
      reject(fail)
    })
  })

}
// 查列表
function getListFromGitHub(userName, accessToken, path) {
  return new Promise((resolve, reject) => {
    let url = `https://api.github.com/repos/${userName}/${path.substring(0, path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}?access_token=${accessToken}`
    background_ajax('get', url).then(res => {
      let result = res
      resolve(result)
    }, fail => {
      reject(fail)
    })
  })

}
// 获取sha
function getShaFromGitHub(userName, accessToken, path) {
  return new Promise((resolve, reject) => {
    let url = `https://api.github.com/repos/${userName}/${path.substring(0, path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}?access_token=${accessToken}`
    background_ajax('get', url).then(res => {
      console.log(res);

      if (res.message == 'Not Found') {
        operate.addToGitHub(userName, accessToken, path)
      } else {
        let result = res.sha
        resolve(result)
      }

    }, fail => {
      reject(fail)
    })
  })

}
// 改
function UpdateToGitHub(userName, accessToken, path, msg) {
  let url = `https://api.github.com/repos/${userName}/${path.substring(0, path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}?access_token=${accessToken}`
  let params = {}

  return new Promise((resolve, reject) => {
    operate.getShaFromGitHub(userName, accessToken, path).then((data) => {
      // // 需要获取文件sha
      params.sha = data
      params.message = 'upload note'
      // content内容需转成base64
      params.content = common.Base64.encode(JSON.stringify(msg))
      background_ajax('put', url, JSON.stringify(params)).then(res => {
        resolve(res)
      }, fail => {
        console.log(fail);
        reject(fail)
      })
    }, fail => {
      reject(fail)
    })

  })
}
// 删
function DeleteFromGitHub(userName, accessToken, path) {
  return new Promise((resolve, reject) => {
    let url = `https://api.github.com/repos/${userName}/${path.substring(0, path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}?access_token=${accessToken}`
    let params = {}
    operate.getShaFromGitHub(userName, accessToken, path).then((data) => {
      // // 需要获取文件sha
      params.sha = data
      params.message = 'delete note'
      url += `&message=${params.message}&sha=${params.sha}`

      background_ajax('delete', url).then(res => {
        resolve(res)
      }, fail => {
        console.log(fail);
        reject(fail)
      })
    }, fail => {
      reject(fail)
    })

  })

}