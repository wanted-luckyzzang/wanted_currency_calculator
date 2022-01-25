# 환율 계산기 구현

## 🥽 배포 링크
<h2><a href='https://determined-volhard-ea03ee.netlify.app'>https://determined-volhard-ea03ee.netlify.app</a></h2>

## 🚩 노션 주소
<h2><a href='https://www.notion.so/328d6ce7811640f1a02da6c57b8d995c'>https://www.notion.so/328d6ce7811640f1a02da6c57b8d995c</a></h2>

## 🔮 역할 배분
⚜ 박민주, 안병진 --- 1번째 계산기 구현<br/>
⚜ 이지용, 윤예나 --- 2번째 계산기 구현<br/>

## 🧶 설치 및 시작하는 법

```
npm run start
```

## ✨ 구현 영상

<img src="https://user-images.githubusercontent.com/68722179/151032212-c40e493f-d6c5-4a49-b9b1-3c69a53b3533.gif" width="600" />

✅ 과제에 제시된 요구사항 모두 구현
* 환율 계산 및 결과 렌더링
* input 입력 시 실시간으로 ',' 찍기
* 결과 금액에 ',' 추가 및 소수점 두번째 자리까지 표시 <br/>

✅ 추가 구현사항
* [1번째 계산기] - 로컬스토리지
* [2번째 계산기] - 첫 렌더링 시 첫번째 탭을 defalut로 선택, utils 함수 구현


## 🚀 과제질문 3가지 답변

1. 프로젝트의 폴더 구조와 해당 구조의 장단점
<img src="https://user-images.githubusercontent.com/68722179/151045023-8ea94919-792d-4d8f-9de6-d9481ea8d0d8.png" width="200" />
<br/>

src 폴더 내에 common, components, utils 폴더를 만들었습니다. <br/>

▶ common 폴더: 공통 컴포넌트로 사용 가능한 Grid 포함 (width, padding 등 여백, 간격과 관련된 컴포넌트)<br/>
▶ components 폴더: App.js에 렌더링할 2가지 계산기 컴포넌트<br/>
▶ utils 폴더: 날짜 형식과 금액 형식(3자리마다 comma, 소수점 2자리 표시) 등 공통으로 쓰일 수 있는 함수 <br/>

<br/>
<br/>
2. 선택한 CSS 작성 방법과 선택한 이유 <br/>
✅ CSS-in-JS 라이브러리 중 하나인 styled components 구조로 진행하였습니다.<br/>
✅ 장점 :<br/>
    - props를 활용한 조건부 스타일링이 가능하다.
    - 한 컴포넌트 내에서 css 코드를 함께 작업할 수 있다.
    - 리액트 식의 컴포넌트 분리가 편해서 재사용성이 높다.<br/>
✅ 단점 :<br/>
    - css를 줄 태그를 일일이 컴포넌트로 만들어야 한다.
    - CSS 수정할 때마다 해당 컴포넌트 파일 위치를 찾아야 하는 번거로움이 있다.<br/>

<br/>

3. 팀의 Commit Message 템플릿과 그렇게 정한 이유
- 팀 내 커밋 메시지의 일관성을 준수하는 것을 연습하기 위해 
이번 과제는 기존 템플릿을 그대로 사용하였습니다.

▶ **Add** - 레이아웃 / 기능 추가
▶ **Remove** - 내용 삭제 (폴더 / 파일 삭제)
▶ **Modify** - 수정 (JSON 데이터 포맷 변경 / CSS 수정)
▶ **Fix** - 버그/오류 해결
▶ **Refactor** - 코드 리팩토링 (스스로 리팩토링 / 중복 코드 제거 / 불필요 코드 제거 / 성능 개선, merge)
