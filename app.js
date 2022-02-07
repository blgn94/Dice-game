// Тоглоомын бүх газарт ашиглагдах глобаль хувьсагчдыг энд зарлая.
// Тоглоом дууссан эсэхийг хадгалах төлөвийн хувьсагч.
var isNewGame;
// Аль тоглогч шоо шидэх вэ гэдгийг энд хадгална.
var activePlayer;
// Хоёр тоглогчийн цуглуулсан оноонууд.
var scores;
// Идэвхтэй тоглогчийн цуглуулж байгаа ээлжийн оноо.
var roundScore;
var diceNumber;

// Шооны зургийг үзүүлэх элементийг DOM-оос хайж олоод энд хадгалъя.
var diceDom = document.querySelector('.dice');

// Тоглоомыг эхлүүлнэ.
initGame();

// Тоглоомыг шинээр эхлэхэд бэлтгэнэ.
function initGame() {
    // Тоглоом эхэллээ гэдэг төлөвт оруулна.
    isNewGame = true;

    // Тоглогчийн ээлжийг хадгалах хувьсагч, нэгдүгээр тоглогчыг 0, хоёрдугаар тоглогчийг 1 гэж тэмдэгэе.
    activePlayer = 0;

    // Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
    scores = [0, 0];

    // Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
    roundScore = 0;

    // Шооны аль талаараа буусныг хадгалах хувьсагч хэрэгтэй, 1-6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө.

    // Програм эхлэхэд бэлтгэе
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    // Тоглогчдын нэрийг буцааж гаргах.
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");

    document.querySelector(".player-0-panel").classList.add("active");

    diceDom.style.display = "none";
}

// Шоог шидэг эвент листенер
document.querySelector('.btn-roll').addEventListener("click", function(){
    if(isNewGame) {
        // 1 - 6 доторх санамсаргүй нэг тоо гаргаж авна
        var diceNumber = Math.floor(Math.random() * 6) + 1;

        // Шоонызургийг вэб дээр гаргаж ирнэ.
        diceDom.style.display = "block";

        // Буусан санамсаргүй тоонд харгалзах шооны зургийг вэб дээр гаргаж ирнэ.
        diceDom.src = "dice-" + diceNumber + ".png";

        // Буусан тоо нь 1 ээс ялгаатай бол идэвхтэй тоглогчын ээлжийн оноог нэмэгдүүлнэ.
        if(diceNumber !== 1){
            // 1-ээс ялгаатай доо буулаа. Буусан тоог тоглогчид нэмж өгнө.
            roundScore += diceNumber;
            document.getElementById("current-" + activePlayer).textContent = roundScore;
        }
        else {
            // 1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө.
            switchToNextPlayer();
        }
    }
    else {
        alert("Тоглоом дууссан байна. NEW GAME товчийг дарж шинээр эхлэнэ үү");
    }
});

// HOLD товчны эвент листенер
document.querySelector(".btn-hold").addEventListener("click", function() {
    if(isNewGame){
        // Уг тоглогчийн цуглуулсан ээлжний оноог глобаль оноон дээр нь нэмж өгнө.
        scores[activePlayer] += roundScore;

        // Дэлгэц дээр оноог өөрчилнө.
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

        // Уг тоглогч хожсон эсэхийг (оноо нь 100-аас их эсэх) шалгах.
        if(scores[activePlayer] >= 100){
            // Тоглоомыг дууссан төлөвт оруулна.
            isNewGame = false;
            // Ялагч гэсэн текстийг нэрнийх нь оронд гаргана.
            document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        }
        else {
            // Тоглогчийн ээлжийг солино.
            switchToNextPlayer();
        }
    }
    else {
        alert("Тоглоом дууссан байна. NEW GAME товчийг дарж шинээр эхлэнэ үү");
    }
});

// Энэ фунцк нь тоглох ээлжийг дараачийн тоглогч руу шилжүүлдэг.
function switchToNextPlayer() {
    // Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно.
    roundScore = 0;
    document.getElementById("current-" + activePlayer).textContent = 0;
    // Тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ.
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    // Улаан цэгийг шилжүүлэх
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    // Шоог түр алга болгоно.
    diceDom.style.display = "none";
}

// New game буюу Шинэ тоглоом эхлүүлэх товчний эвент листенер
document.querySelector(".btn-new").addEventListener("click", initGame);