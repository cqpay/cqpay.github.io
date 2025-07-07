let apiUrl;
if (location.origin.indexOf(`127.0.0.1`) > 0 ||
    location.origin.indexOf(`localhost`) > 0 ||
    location.origin.indexOf(`-dev.`) > 0 ||
    /\d+\.\d+\.\d+\.\d+/.test(location.origin)) {
    apiUrl = `https://pay.cqpay.io`;
} else {
    const pos = location.origin.indexOf('.');
    const domain = location.origin.substring(pos);
    apiUrl = `https://pay${domain}`;
}

//  window.BASEURL = 'http://192.168.0.4:5050/pay/'
apiUrl = `https://api3.cqpay.men`;
window.BASEURL = `${apiUrl}/pay-api/pay/`;
window.CODE12VIDEOPATH = 'https://youtu.be/S9zD7M9MumY'