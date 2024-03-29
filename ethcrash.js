console.log("test");
var CryptoJS = require("crypto-js");
const shortid = require('shortid');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ games: []})
	.write();



crashes = [];
var hash = "e9518a332483fcf68b375ffb2d3b4e6b87b05fd94d9709ef8a64c01e2a34cf49";
var gameNumber = 1496357;

function getGameFromNumber(gamenumber) {
    lasthash = ""
    var gameHash = (lastHash!=""?genGameHash(lastHash):hash);
    var gameCrash = crashPointFromHash((lastHash!=""?genGameHash(lastHash):hash));
}

function getGamesFromDB(samplecount) {
    b = db.get('games')
    .find()
    .take(samplecount)
    .value();
    return b;
}


function simulateGame(samplecount, startbalance, betamount, crashmult, multwin, multloss, stopbetval) {
    profit = 0;
    balance = startbalance;
    lastwon = true;
    multbet = betamount;
    streak = 0;
    games = getGamesFromDB(samplecount);
    console.log(games[0].crash);
    for(i = games.length; i > 0; i--) {
        if(multbet >= stopbetval) {
            multbet = betamount;
        }
        profit = 0;
        if (multbet > balance) {
            console.log("Bet greater than balance: " + multbet + " betted at balance: " + balance);
            break;
        }
        crashed = games[i-1].crash;
        console.log("betted: " + multbet + " at: " + crashmult + " game crashed at: " + crashed);
        if(crashed >= crashmult) {
            profit = (multbet * crashmult) - multbet;
            balance += (multbet * crashmult) - multbet;
            if(multwin > 1) {
                multbet = multbet * multwin;
            }
            if(multwin == 1) {
                multbet = betamount;
            }
        } else {
            profit -= multbet;
            balance -= multbet;
            if(multloss > 1) {
                multbet = multbet * multloss;
            }
            if(multloss == 1) {
                multbet = betamount;
            }
        }
        console.log("profited: " + profit + " balance: " + balance);
    }
    console.log(balance);
    netprofit = balance - startbalance;
    console.log("net profit: " + netprofit);
}





function getGames(samplecount){
    var lastHash = "";
    var amount = samplecount;
    var maxcrash = 0;
    var gameses = [];
    for(var i=0; i<amount; i++){
        var game = {}
        var gameHash = (lastHash!=""?genGameHash(lastHash):hash);
        var gameCrash = crashPointFromHash((lastHash!=""?genGameHash(lastHash):hash));
        game.gamenumber = gameNumber;
        game.crash = gameCrash;
        if (maxcrash < gameCrash ) {
            console.log(maxcrash);
            maxcrash = gameCrash;
        }
        //crashes.push(gameCrash);
        lastHash = gameHash;
        gameNumber--;
        gameses.push(game);
    }
    console.log(maxcrash);
    db.get('games')
    .push(gameses)
    .write();
}

function lastGameNumber() {
    b = db.get('games')
    .find()
    .take(1)
    .value()[0].gamenumber;
    return b;
}

function updateGames() {
    lastGameNumber = lastGameNumber();
    
    var lastHash = "";
    
    var gameses = [];
    for(var i=0; i<amount; i++){
        var game = {}
        var gameHash = (lastHash!=""?genGameHash(lastHash):hash);
        var gameCrash = crashPointFromHash((lastHash!=""?genGameHash(lastHash):hash));
        game.gamenumber = gameNumber;
        game.crash = gameCrash;
        if (maxcrash < gameCrash ) {
            console.log(maxcrash);
            maxcrash = gameCrash;
        }
        //crashes.push(gameCrash);
        lastHash = gameHash;
        gameNumber--;
        gameses.push(game);
    }
    console.log(maxcrash);
    db.get('games')
    .push(gameses)
    .write();



}


function arrfreq(item, index, freqarr) {
    freqarr[Math.floor(item.crash)] += 1;
}

function frequencyArr() {
    freqarr = {};
    a = db.get('games')
    .find()
    .value();
    for(i = 0; i < a.length; i++) {
        console.log(a[i].crash)
    }
    return a;
}


function GetNumMultsAbove(mult) {
    
    a = db.get('games')
    .find()
    .filter(games => games.crash > 5000)
    .value();

    b = db.get('games')
    .find()
    .unshift({"test" : "test"})
    .write();

    console.log(a);

}


function distanceBetween(crashmult) {
    count = 0
    for(let val of crashes){
        count++;
        if(val >= crashmult){
            console.log(count);
            console.log(val);
            return;
        }
    }

}



function highestMult() {
    highestMult = 0;
    for(let crashedmult of crashes){
        gamecount++;
        if(crashedmult >= crashmult){
            console.log("crashed at game: " + gamecount + " at value of " + crashedmult);
            crashedtimes++;
        }
    }
    console.log("average distance between crashes is: " + samplecount / crashedtimes);
    console.log(crashmult + "x happened " + crashedtimes + " times");
}



function averageDistanceBetween(crashmult)
{
    crashedtimes = 0;
    gamecount = 0
    for(let crashedmult of crashes){
        gamecount++;
        if(crashedmult >= crashmult){
            console.log("crashed at game: " + gamecount + " at value of " + crashedmult);
            crashedtimes++;
        }
    }
    console.log("average distance between crashes is: " + samplecount / crashedtimes);
    console.log(crashmult + "x happened " + crashedtimes + " times");
}


function divisible(hash, mod) {
    // So ABCDEFGHIJ should be chunked like  AB CDEF GHIJ
    var val = 0;

    var o = hash.length % 4;
    for (var i = o > 0 ? o - 4 : 0; i < hash.length; i += 4) {
        val = ((val << 16) + parseInt(hash.substring(i, i+4), 16)) % mod;
    }

    return val === 0;
}

function genGameHash(serverSeed) {
    return CryptoJS.SHA256(serverSeed).toString()
};


function hmac(key, v) {
    var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
    return hmacHasher.finalize(v).toString();
}

function crashPointFromHash(serverSeed) {
    // see: provably fair seeding event https://bitcointalk.org/index.php?topic=4959619
    //Block 6217364 0xd8b8a187d5865a733680b4bf4d612afec9c6829285d77f438cd70695fb946801
    var hash = hmac(serverSeed, '0xd8b8a187d5865a733680b4bf4d612afec9c6829285d77f438cd70695fb946801');

    // In 1 of 101 games the game crashes instantly.
    if (divisible(hash, 101))
        return 0;

    // Use the most significant 52-bit from the hash to calculate the crash point
    var h = parseInt(hash.slice(0,52/4),16);
    var e = Math.pow(2,52);

    return (Math.floor((100 * e - h) / (e - h))/100).toFixed(2);
};


//getGames(5000);
simulateGame(4500, 100000, 100, 3, 1, 1.6, 45000);

//frequencyArr();
//GetNumMultsAbove(10);

//getGames(1000000);


//averageDistanceBetween(1000);