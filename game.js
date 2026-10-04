const canvas = document.getElementById("sanyunGame");
const ctx = canvas.getContext("2d");

let trangThaiDen = "GREEN"; 
let tgianDoiDen = 2500; // Khởi đầu với thời gian cân bằng 2.5 giây

let nguoiX = 50; 
let nguoiY = 250;
let dangChay = false; 
let tocDoChay = 4.5; 

const vachDichX = 730; 
let trangThaiGame = "CHOI"; 

// --- ĐỘ KHÓ: 2 VẬT CẢN DI ĐỘNG ---
let vatCan1Y = 50;
let tocDoVatCan1 = 4;
const vatCan1X = 280; 
const vatCan1Rong = 20;
const vatCan1Cao = 90;

let vatCan2Y = 260; 
let tocDoVatCan2 = -5.5; 
const vatCan2X = 520; 
const vatCan2Rong = 20;
const vatCan2Cao = 90;

let gocMau = 0; 

canvas.addEventListener("mousedown", () => {
    if (trangThaiGame === "CHOI") dangChay = true;
});

canvas.addEventListener("mouseup", () => {
    dangChay = false;
});

// --- THUẬT TOÁN ĐÃ SỬA: ĐÈN XANH CHUẨN GIẢI TRÍ (2 - 3 GIÂY) ---
function doiDenTuDong() {
    if (trangThaiGame !== "CHOI") return;

    if (trangThaiDen === "GREEN") {
        trangThaiDen = "RED";
        // Đèn đỏ giữ ngẫu nhiên từ 1.5 giây đến 2.5 giây để tạo độ hồi hộp
        tgianDoiDen = 1500 + Math.random() * 1000; 
    } else {
        trangThaiDen = "GREEN";
        // Đèn xanh giữ cố định trong khoảng vừa tầm từ 2 giây đến 3 giây
        tgianDoiDen = 2000 + Math.random() * 1000; 
    }
    setTimeout(doiDenTuDong, tgianDoiDen);
}
setTimeout(doiDenTuDong, 2000);

function vongLapGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    gocMau = (gocMau + 1.5) % 360; 
    let mauNeonCauVong = `hsl(${gocMau}, 100%, 65%)`;

    // 1. Vẽ Vạch Đích Cầu Vồng Phát Sáng
    ctx.shadowColor = mauNeonCauVong;
    ctx.shadowBlur = 15;
    ctx.strokeStyle = mauNeonCauVong;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(vachDichX, 50);
    ctx.lineTo(vachDichX, 350);
    ctx.stroke();

    ctx.fillStyle = mauNeonCauVong;
    ctx.font = "bold 16px Arial";
    ctx.fillText("VẠCH ĐÍCH", vachDichX - 35, 38);
    ctx.shadowBlur = 0; 

    // 2. Di chuyển & Vẽ Vật cản 1 (Neon Tím)
    vatCan1Y += tocDoVatCan1;
    if (vatCan1Y < 50 || vatCan1Y > 350 - vatCan1Cao) tocDoVatCan1 = -tocDoVatCan1; 
    ctx.shadowColor = "#ff00ff"; ctx.shadowBlur = 10;
    ctx.fillStyle = "#ff00ff";
    ctx.fillRect(vatCan1X, vatCan1Y, vatCan1Rong, vatCan1Cao);

    // 3. Di chuyển & Vẽ Vật cản 2 (Neon Cam)
    vatCan2Y += tocDoVatCan2;
    if (vatCan2Y < 50 || vatCan2Y > 350 - vatCan2Cao) tocDoVatCan2 = -tocDoVatCan2; 
    ctx.shadowColor = "#ff9f43"; ctx.shadowBlur = 10;
    ctx.fillStyle = "#ff9f43";
    ctx.fillRect(vatCan2X, vatCan2Y, vatCan2Rong, vatCan2Cao);
    ctx.shadowBlur = 0;

    // 4. Vẽ Tín Hiệu Đèn Neon Lớn Giữa Màn Hình
    if (trangThaiDen === "GREEN") {
        ctx.shadowColor = "#2ed573"; ctx.shadowBlur = 20;
        ctx.fillStyle = "#2ed573";
        ctx.fillRect(350, 10, 100, 35);
        ctx.fillStyle = "black"; ctx.shadowBlur = 0;
        ctx.font = "bold 14px Arial";
        ctx.fillText("ĐÈN XANH", 365, 33);
    } else {
        ctx.shadowColor = "#ff4757"; ctx.shadowBlur = 20;
        ctx.fillStyle = "#ff4757";
        ctx.fillRect(350, 10, 100, 35);
        ctx.fillStyle = "white"; ctx.shadowBlur = 0;
        ctx.font = "bold 14px Arial";
        ctx.fillText("ĐÈN ĐỎ", 375, 33);
    }

    // 5. Xử lý logic Di chuyển & Gió đẩy lùi
    if (trangThaiGame === "CHOI") {
        if (dangChay) {
            nguoiX += tocDoChay; 
            if (trangThaiDen === "RED") {
                trangThaiGame = "THUA_DEN";
                dangChay = false;
            }
        } else {
            if (nguoiX > 50) nguoiX -= 0.25; // Lực gió đẩy lùi vừa phải
        }

        // Kiểm tra va chạm vật cản 1 và 2
        if ((nguoiX + 15 > vatCan1X && nguoiX - 15 < vatCan1X + vatCan1Rong && nguoiY + 15 > vatCan1Y && nguoiY - 15 < vatCan1Y + vatCan1Cao) ||
            (nguoiX + 15 > vatCan2X && nguoiX - 15 < vatCan2X + vatCan2Rong && nguoiY + 15 > vatCan2Y && nguoiY - 15 < vatCan2Y + vatCan2Cao)) {
            trangThaiGame = "THUA_VACAN";
            dangChay = false;
        }
    }

    // 6. Vẽ Nhân Vật Cầu Vồng Neon rực rỡ
    ctx.shadowColor = mauNeonCauVong;
    ctx.shadowBlur = 15;
    ctx.fillStyle = mauNeonCauVong;
    ctx.beginPath();
    ctx.arc(nguoiX, nguoiY, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // 7. Điều kiện thắng
    if (nguoiX >= vachDichX && (trangThaiGame === "CHOI")) {
        trangThaiGame = "THANG";
        dangChay = false;
    }

    // 8. Màn hình thông báo Thắng / Thua kết thúc game
    if (trangThaiGame === "THANG") {
        ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.shadowColor = mauNeonCauVong; ctx.shadowBlur = 20;
        ctx.fillStyle = mauNeonCauVong;
        ctx.font = "bold 32px Arial";
        ctx.fillText("🌟 THẦN ĐỒNG LẬP TRÌNH! BẠN ĐÃ THẮNG! 🌟", 70, 200);
    } else if (trangThaiGame === "THUA_DEN") {
        ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ff4757"; ctx.font = "bold 26px Arial";
        ctx.fillText("BẠN DI CHUYỂN KHI ĐÈN ĐỎ! ❌ BỊ LOẠI!", 160, 190);
        ctx.fillStyle = "white"; ctx.font = "16px Arial";
        ctx.fillText("Bấm chuột vào màn hình để hồi sinh", 270, 240);
    } else if (trangThaiGame === "THUA_VACAN") {
        ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ff9f43"; ctx.font = "bold 26px Arial";
        ctx.fillText("💥 ĐỤNG PHẢI VẬT CẢN NEON! NỔ TUNG!", 150, 190);
        ctx.fillStyle = "white"; ctx.font = "16px Arial";
        ctx.fillText("Bấm chuột vào màn hình để chơi lại", 270, 240);
    }

    requestAnimationFrame(vongLapGame);
}

canvas.addEventListener("click", () => {
    if (trangThaiGame !== "CHOI") {
        nguoiX = 50;
        trangThaiGame = "CHOI";
        trangThaiDen = "GREEN";
        dangChay = false;
        vatCan1Y = 50;
        vatCan2Y = 260;
        setTimeout(doiDenTuDong, 2000);
    }
});

vongLapGame();
