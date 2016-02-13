define({ "api": [  {    "type": "get",    "url": "/posts/:id",    "title": "Get Post",    "name": "GetPost",    "group": "Post",    "description": "<p>포스트 데이터 가져오는 API</p>",    "examples": [      {        "title": "Example usage:",        "content": "curl -i http://godong9.com:3001/posts/56bf1c7f8f2f3ab94ec59e51",        "type": "curl"      }    ],    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "post",            "description": "<p>post 데이터</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "post._id",            "description": "<p>post id</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "post.author",            "description": "<p>작성자 id</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "post.subject",            "description": "<p>제목</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "post.content",            "description": "<p>내용</p>"          },          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "post.isSecret",            "description": "<p>현재 비밀 여부(true: 비밀상태, false: 공개 상태)</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "post.openDate",            "description": "<p>공개되는 시간</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "post.emotionStatus",            "description": "<p>감정상태 (1:bad ~ 5:good). 0은 설정안한 상태</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": \"56bf1c7f8f2f3ab94ec59e51\",\n    ...\n  }\n]",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/posts.js",    "groupTitle": "Post"  },  {    "type": "post",    "url": "/posts",    "title": "Add New Post",    "name": "PostPost",    "group": "Post",    "description": "<p>포스트 데이터 추가하는 API</p>",    "examples": [      {        "title": "Example usage:",        "content": "http://godong9.com:3001/posts",        "type": "curl"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Object",            "optional": false,            "field": "post",            "description": "<p>post 데이터</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "post.title",            "description": "<p>제목</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "post.content",            "description": "<p>내용</p>"          },          {            "group": "Parameter",            "type": "Date",            "optional": false,            "field": "post.openDate",            "description": "<p>공개되는 시간 (표준시 형태로 넘겨야함. ex)&quot;2016-05-17T11:16:53.378Z&quot;)</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "post",            "description": "<p>post 데이터</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "post._id",            "description": "<p>post id</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"123456abcdef\"\n  ...\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/posts.js",    "groupTitle": "Post"  },  {    "type": "put",    "url": "/posts/:id",    "title": "Update Post",    "name": "PutPost",    "group": "Post",    "description": "<p>포스트 데이터 업데이트하는 API (감정상태 업데이트)</p>",    "examples": [      {        "title": "Example usage:",        "content": "http://godong9.com:3001/posts/56bf1c7f8f2f3ab94ec59e51",        "type": "curl"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Object",            "optional": false,            "field": "post",            "description": "<p>post 데이터</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "post.emotionStatus",            "description": "<p>감정상태(1:bad ~ 5:good)</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/posts.js",    "groupTitle": "Post"  },  {    "type": "get",    "url": "/users/:id",    "title": "Get User Info",    "name": "GetUser",    "group": "User",    "description": "<p>유저 데이터 가져오는 API</p>",    "examples": [      {        "title": "Example usage:",        "content": "curl -i http://godong9.com:3001/users/56bf10b48ef8be4e4c3c858f",        "type": "curl"      }    ],    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "user",            "description": "<p>user 데이터</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "user._id",            "description": "<p>유저 id</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "user.nickname",            "description": "<p>유저 닉네임</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "user.email",            "description": "<p>유저 이메일</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "user.birthday",            "description": "<p>유저 생일</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "user.emotionStatus",            "description": "<p>유저 감정상태 (1:bad ~ 5:good)</p>"          },          {            "group": "Success 200",            "type": "Object[]",            "optional": false,            "field": "user.posts",            "description": "<p>유저가 쓴 포스트 목록</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"56bf10b48ef8be4e4c3c858f\",\n  ...\n  \"posts: [{ ... }]\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/users.js",    "groupTitle": "User"  },  {    "type": "get",    "url": "/login",    "title": "Naver Login",    "name": "Login",    "group": "User",    "description": "<p>네이버 로그인하는 API (/login 으로 페이지 이동)</p>",    "version": "0.0.0",    "filename": "routes/users.js",    "groupTitle": "User"  }] });
