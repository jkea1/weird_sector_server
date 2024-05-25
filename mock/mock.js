// db 대신할 메모리 상의 임시 데이터
let posts = [
  {
    id: '1',
    category: 'free',
    title: '새로운 게시물 생성',
    text: 'new message :)',
    nickname: 'ea',
    createdAt: new Date().toString(),
    userId: '1716105098142',
    viewCount: '20344',
    file: 'https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg',
    hashtag: ['새로운', '게시물', '생성'],
    comment: [
      {
        nickname: '진경',
        commentText: '댓글을 생성하다.',
        createdAt: new Date().toString(),
      },
      {
        nickname: '에릭',
        commentText: '에릭이 댓글을 생성하다.',
        createdAt: new Date().toString(),
      },
    ],
  },
  {
    id: '2',
    category: 'question',
    title: '새로운 질문 게시물 생성',
    text: 'new question :)',
    nickname: '질문왕',
    createdAt: new Date().toString(),
    userId: '1716105098142',
    viewCount: '2104',
    file: 'https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg',
    hashtag: ['새로운', '질문', '생성'],
    comment: [
      {
        nickname: '답변이',
        commentText: '답변을 생성하다.',
        createdAt: new Date().toString(),
      },
      {
        nickname: '유저',
        commentText: '유저가 댓글을 생성하다.',
        createdAt: Date.now().toString(),
      },
    ],
  },
]
