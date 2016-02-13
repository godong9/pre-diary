define({ "api": [  {    "type": "get",    "url": "/posts",    "title": "Get Post List",    "name": "GetPostList",    "group": "Post",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "userId",            "description": "<p>유저 ID</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object[]",            "optional": false,            "field": "post",            "description": "<p>post 리스트 데이터</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "post.id",            "description": "<p>post id</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": \"123456abcdef\"\n  }\n]",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/posts.js",    "groupTitle": "Post"  },  {    "type": "get",    "url": "/users/:id",    "title": "Get User Info",    "name": "GetUser",    "group": "User",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "user",            "description": "<p>user 데이터</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "user.id",            "description": "<p>유저 id</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"123456abcdef\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/users.js",    "groupTitle": "User"  },  {    "type": "post",    "url": "/users",    "title": "Add New User",    "name": "PostUser",    "group": "User",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "type",            "description": "<p>가입 타입</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "user",            "description": "<p>user 데이터</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "user.id",            "description": "<p>유저 id(쿠키에 저장할 값)</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"123456abcdef\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/users.js",    "groupTitle": "User"  }] });
