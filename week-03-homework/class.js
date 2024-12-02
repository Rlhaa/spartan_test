class Character {
  constructor(name) {
    this.name = name; // 닉네임
    this.maxHp = 500;
    this.hp = 300;
    this.strong = 10; // 기본공격력
    this.level = 1; // 기본 레벨
  }

  attack() {
    console.log(`${this.name}이/가 공격을 시도합니다!`);
  }

  heal(amount) {
    this.hp += amount;
    if (this.hp > this.maxHp) {
      // 플레이어 최대 체력
      this.hp = this.maxHp; // 현재 체력) {
    }
    console.log(`${this.name}의 체력이 ${amount}만큼 회복되었습니다.`);
  }

  levelUp() {
    this.level += 1;
    // 레벨업 시 공격력, 최대체력이 랜덤값만큼 오른다 (1~5까지의 정수)
    this.strong += Math.floor(Math.random() * 5 + 1);
    this.maxHp += Math.floor(Math.random() * 5 + 1);
  }
}

const Characeter1 = new Character("전사");
const Characeter2 = new Character("도적");
const Characeter3 = new Character("마법사");

Characeter1.attack();
Characeter2.attack();
Characeter3.attack();

Characeter1.heal(1000);
console.log(`체력 : ${Characeter1.hp}/${Characeter1.maxHp}`);
Characeter2.heal(70);
console.log(`체력 : ${Characeter2.hp}/${Characeter2.maxHp}`);
Characeter3.heal(30);
console.log(`체력 : ${Characeter3.hp}/${Characeter3.maxHp}`);
