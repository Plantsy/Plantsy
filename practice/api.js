$.ajax({
    method: "GET",
    url: "https://plantsdb.xyz/search?fields=",
    }).then(function(data) {
        console.log(data);