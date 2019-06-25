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

                //温度显示
                var temp=document.createElement('div');
                temp.classList.add('plug_window_temp');
                console.log(wendu);
                console.log(forecast);
            }

            // let showdiv=`<div class='plug_window_main'><span class='plug_window_city'>${city}</span></div>`;
            // let div=document.createElement('div');
            // div.innerHTML=showdiv;
            // maindiv.appendChild(div);
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