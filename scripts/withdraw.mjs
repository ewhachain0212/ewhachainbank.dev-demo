const CONTRACT_ADDRESS = "Mumbai Testnet에 배포한 컨트랙트 주소"

async function withdraw(contractAddress) {
    const EwhachainBank = await ethers.getContractFactory("EwhachainBank") // EwhachainBank 컨트랙트를 인스턴스를 생성
    const amount = ethers.utils.parseUnits("0.05", "ether") ; // 출금할 matic 수량을 matic의 단위에 맞게 바꾸어줌, 다음의 경우 0.05 matic을 출금
    const [recipient] = await ethers.getSigners() // 내 account 정보 불러오기 => 내 private key로 sign 하기 때문에 signer는 나의 account, 다음의 경우 0.05 matic을 출금해서 나 자신이 받음
    const withdrawTx = await EwhachainBank.attach(contractAddress).withdraw(recipient.address, amount); // 위에 배포된 EwhachainBank 컨트랙트 주소에 0.05 matic을 출금하여 recipient에게 보냄
    console.log(await withdrawTx.wait()); // withdraw하는 트랜잭션 정보 출력
}

withdraw(CONTRACT_ADDRESS)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });