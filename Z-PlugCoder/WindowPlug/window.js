console.log('window start');
const maindiv=document.getElementById('plug_main');
const window_url = 'http://wthrcdn.etouch.cn/weather_mini?city=';
show_window_data('杭州');
//展示天气信息
function show_window_data(city) {
    get_window_data(city).then((ret) => {

        if(ret){
            ret=JSON.parse(ret);
            let {data,status}=ret;
            if(status==1000){
                let {city,forecast,ganmao,wendu} = data;

                console.log(wendu);
                console.log(forecast);
            }

            let showdiv=`<div class='plug_window_main'><span class='plug_window_city'>${city}</span></div>`;
            let div=document.createElement('div');
            div.innerHTML=showdiv;
            maindiv.appendChild(div);
        }
    }, (error) => {
        console.log(error);
    });
}
//获取天气信息
function get_window_data(city) {
    return new Promise((resolve, reject) => {
        try {
            chrome.extension.sendMessage({
                'url': window_url + city,
                'type': 'get'
            }, function (ret) {
                if (ret) {
                    resolve(ret);
                }
            });

        } catch (e) {
            reject(e)
        } finally {

        }

    });
}



// {
//     "data": {
//         "yesterday": {
//             "date": "29日星期三",
//             "high": "高温 27℃",
//             "fx": "东风",
//             "low": "低温 17℃",
//             "fl": "<![CDATA[<3级]]>",
//             "type": "晴"
//         },
//         "city": "杭州",
//         "forecast": [{
//             "date": "30日星期四",
//             "high": "高温 28℃",
//             "fengli": "<![CDATA[<3级]]>",
//             "low": "低温 20℃",
//             "fengxiang": "南风",
//             "type": "小雨"
//         }, {
//             "date": "31日星期五",
//             "high": "高温 28℃",
//             "fengli": "<![CDATA[<3级]]>",
//             "low": "低温 20℃",
//             "fengxiang": "无持续风向",
//             "type": "多云"
//         }, {
//             "date": "1日星期六",
//             "high": "高温 27℃",
//             "fengli": "<![CDATA[<3级]]>",
//             "low": "低温 19℃",
//             "fengxiang": "东风",
//             "type": "多云"
//         }, {
//             "date": "2日星期天",
//             "high": "高温 31℃",
//             "fengli": "<![CDATA[<3级]]>",
//             "low": "低温 20℃",
//             "fengxiang": "无持续风向",
//             "type": "多云"
//         }, {
//             "date": "3日星期一",
//             "high": "高温 34℃",
//             "fengli": "<![CDATA[<3级]]>",
//             "low": "低温 21℃",
//             "fengxiang": "无持续风向",
//             "type": "晴"
//         }],
//         "ganmao": "各项气象条件适宜，无明显降温过程，发生感冒机率较低。",
//         "wendu": "23"
//     },
//     "status": 1000,
//     "desc": "OK"
// }