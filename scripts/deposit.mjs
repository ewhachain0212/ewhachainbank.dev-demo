const CONTRACT_ADDRESS = "Mumbai Testnet에 배포한 컨트랙트 주소"

async function deposit(contractAddress) {
    const EwhachainBank = await ethers.getContractFactory("EwhachainBank") // EwhachainBank 컨트랙트를 인스턴스를 생성
    const option = { value: ethers.utils.parseUnits("0.1", "ether") }; // 보낼 matic 수량을 matic의 단위에 맞게 바꾸어줌, 다음의 경우 2 Klay를 예치
    const depositTx = await EwhachainBank.attach(contractAddress).deposit(option); // 위에 배포된 EwhachainBank 컨트랙트 주소에 2 Klay 만큼 예치
    console.log(await depositTx.wait()); // deposit하는 트랜잭션 정보 출력
}

deposit(CONTRACT_ADDRESS)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });