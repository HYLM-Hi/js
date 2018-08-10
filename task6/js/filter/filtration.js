app.filter('reverse', function() { //可以注入依赖
    return function(type) {
        switch(type){
            case 0: return'首页banner';
            case 1: return'找职位banner';
            case 2: return'找精英banner';
            case 3: return'行业大图';
        }
    }
});

app.filter('draft', function() { //可以注入依赖
    return function(status) {
        switch(status){
            case 1: return'草稿';
            case 2: return'上线';
        }
    }
});

app.filter('online', function() { //可以注入依赖
    return function(status) {
        switch(status){
            case 1: return'上线';
            case 2: return'下线';
        }
    }
});

