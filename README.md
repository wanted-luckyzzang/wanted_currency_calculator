# 환율 계산기 구현

## 🥽 배포 링크
<h2><a href='http://currency-calculator.s3-website.ap-northeast-2.amazonaws.com/'>http://currency-calculator.s3-website.ap-northeast-2.amazonaws.com/</a></h2>

## 🚩 노션 주소
<h2><a href='https://www.notion.so/328d6ce7811640f1a02da6c57b8d995c'>https://www.notion.so/328d6ce7811640f1a02da6c57b8d995c</a></h2>

## 🔮 역할 배분
⚜ 박민주, 안병진 --- 1번째 계산기 구현<br/>
⚜ 이지용, 윤예나 --- 2번째 계산기 구현<br/>

## 🧶 설치 및 시작하는 법

```
npm run start
```

## 📁 디렉토리 구조
```
.
├── App.js
├── common              // 공통 컴포넌트로 사용 가능한 Grid 포함(width, padding 등 여백, 간격과 관련된 컴포넌트)
│   └── Grid.js
├── components          // App.js에 렌더링할 2가지 계산기 컴포넌트
│   ├── Calculator1.js
│   └── Calculator2.js
├── index.js
├── reset.css           // css 초기 설정
└── utils               //날짜 형식과 금액 형식(3자리마다 comma, 소수점 2자리 표시) 등 공통으로 쓰일 수 있는 함수
    ├── formatDate.js
    └── formatMoney.js
```

## ✨ 구현 영상
![calculator](https://user-images.githubusercontent.com/49055628/151071952-93db5e90-9092-4e88-bd7d-26066c4830a2.gif)

### ✅ 과제에 제시된 요구사항 모두 구현
* 환율 계산 및 결과 렌더링
* input 입력 시 실시간으로 ',' 찍기
* 결과 금액에 ',' 추가 및 소수점 두번째 자리까지 표시 <br/>

### ✅ 추가 구현사항
* [1번째 계산기] - 로컬스토리지
* [2번째 계산기] - 첫 렌더링 시 첫번째 탭을 defalut로 선택, utils 함수 구현

