/**
 * 
 * 连接github Api
 */

let githubApi = {
  //ajax封装
  background_ajax(type, url, params,access_token) {
    return new Promise((resolve, reject) => {
      try {
        chrome.extension.sendMessage({
          'url': url,
          'type': type,
          'params': params,
          'access_token':access_token
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

  },

  // 增
  addToGitHub(userName, accessToken, path, msg) {
    let url = `https://api.github.com/repos/${userName}/${path.substring(0, path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}`
    let params = {}
    return new Promise((resolve, reject) => {
      // // 需要获取文件sha
      params.message = `create${msg['title']}`
      // content内容需转成base64
      params.content = common.Base64.encode(JSON.stringify(msg))
      background_ajax('put', url, JSON.stringify(params),accessToken).then(res => {
        resolve(res)
      }, fail => {
        reject(fail)
      })
    })

  },

  // 查
  getFromGitHub(userName, accessToken, path) {
    return new Promise((resolve, reject) => {
      let url = `https://api.github.com/repos/${userName}/${path.substring(0, path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}`
      background_ajax('get', url,{},accessToken).then(res => {
        let result = common.Base64.decode(res.content)
        resolve(result)
      }, fail => {
        reject(fail)
      })
    })

  },
  // 查列表
  getListFromGitHub(userName, accessToken, path) {
    return new Promise((resolve, reject) => {
      let url = `https://api.github.com/repos/${userName}/${path.substring(0, path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}`
      background_ajax('get', url,{},accessToken).then(res => {
        let result = res
        resolve(result)
      }, fail => {
        reject(fail)
      })
    })

  },
  // 获取sha
  getShaFromGitHub(userName, accessToken, path) {
    return new Promise((resolve, reject) => {
      let url = `https://api.github.com/repos/${userName}/${path.substring(0, path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}`
      background_ajax('get', url,{},accessToken).then(res => {
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

  },
  // 改
  UpdateToGitHub(userName, accessToken, path, msg) {
    let url = `https://api.github.com/repos/${userName}/${path.substring(0, path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}`
    let params = {}

    return new Promise((resolve, reject) => {
      operate.getShaFromGitHub(userName, accessToken, path).then((data) => {
        // // 需要获取文件sha
        params.sha = data
        params.message = 'upload note'
        // content内容需转成base64
        params.content = common.Base64.encode(JSON.stringify(msg))
        background_ajax('put', url, JSON.stringify(params),accessToken).then(res => {
          resolve(res)
        }, fail => {
          console.log(fail);
          reject(fail)
        })
      }, fail => {
        reject(fail)
      })

    })
  },
  // 删
  DeleteFromGitHub(userName, accessToken, path) {
    return new Promise((resolve, reject) => {
      let url = `https://api.github.com/repos/${userName}/${path.substring(0, path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}`
      let params = {}
      operate.getShaFromGitHub(userName, accessToken, path).then((data) => {
        // // 需要获取文件sha
        params.sha = data
        params.message = 'delete note'
        url += `&message=${params.message}&sha=${params.sha}`

        background_ajax('delete', url,{},accessToken).then(res => {
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
}

export default githubApi