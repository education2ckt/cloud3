# [PRD] 간단한 게시판 애플리케이션 (Simple Board App)

## 1. 프로젝트 개요
React와 Spring MVC를 연동하여 기본적인 CRUD(Create, Read, Update, Delete) 기능을 갖춘 게시판을 구현한다. 사용자 간의 정보를 공유할 수 있는 기본적인 웹 게시판 기능을 제공하는 것을 목표로 한다.

## 2. 주요 기능 (Functional Requirements)
- **게시글 목록 조회**: 작성된 모든 게시글의 제목, 작성자, 작성일을 목록 형태로 확인한다.
- **게시글 상세 조회**: 목록에서 특정 게시글을 클릭하여 제목, 내용, 작성자 등 전체 정보를 확인한다.
- **게시글 작성**: 제목, 작성자, 내용을 입력하여 새로운 게시글을 등록한다.
- **게시글 수정**: 자신이 작성한(또는 수정 권한이 있는) 게시글의 제목과 내용을 수정한다.
- **게시글 삭제**: 특정 게시글을 삭제한다.

## 3. 기술 스택 (Tech Stack)
- **Frontend**: React (Vite 기반), Axios (API 통신)
- **Backend**: Java 21, Spring Boot, Spring MVC
- **Database**: H2 Database (개발 편의를 위해 In-memory 사용)
- **Communication**: REST API (JSON 포맷)

## 4. 데이터 모델 (Data Model)
### Post (게시글)
| 필드명 | 타입 | 설명 |
| :--- | :--- | :--- |
| id | Long | 게시글 식별자 (Primary Key, Auto Increment) |
| title | String | 게시글 제목 |
| content | String | 게시글 내용 (Text) |
| author | String | 작성자 이름 |
| createdAt | LocalDateTime | 작성 일시 |

## 5. API 명세 (API Specification)
- `GET /api/posts`: 게시글 전체 목록 조회
- `GET /api/posts/{id}`: 특정 게시글 상세 조회
- `POST /api/posts`: 게시글 신규 등록 (Body: title, content, author)
- `PUT /api/posts/{id}`: 게시글 수정 (Body: title, content)
- `DELETE /api/posts/{id}`: 게시글 삭제

## 6. UI/UX 요구사항
- **목록(List)**: 테이블 형태의 UI, 작성일 기준 내림차순 정렬.
- **상세(Detail)**: 본문 영역과 목록으로 돌아가기/수정/삭제 버튼 배치.
- **작성/수정(Form)**: 직관적인 입력 폼과 입력 검증(필수값 확인).
- **공통**: 모던하고 깔끔한 디자인 (App.css 활용 또는 스타일 라이브러리).

## 7. 향후 확장 가능성
- 페이징 처리 (Paging)
- 검색 기능 (제목, 작성자 등)
- 로그인 및 회원가입 (Spring Security 연동)
- 댓글 기능
