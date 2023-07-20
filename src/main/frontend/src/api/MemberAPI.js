import axios from "axios";

const MemberAPI = {
  // 이메일로 특정회원 조회
  getMemberInfo: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);
    return await axios
      .get(`/member/email`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        }, // 여기까지가 서버로 header를 실은 요청을 던지는 기능
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // 회원 닉네임 수정
  updateNickName: async (nickname) => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);
    const updateData = {
      nickname: nickname,
    };
    return await axios
      .post("/member/nickname", updateData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        }, // 여기까지가 서버로 header를 실은 요청을 던지는 기능
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // 닉네임 수정 중복값 체크
  nickNameRegCheck: async (nicknameCheck) => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);
    return await axios
      .get(`/member/nicknameCheck?nickname=${nicknameCheck}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        }, // 여기까지가 서버로 header를 실은 요청을 던지는 기능
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // 회원 탈퇴
  deleteMem: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);
    const deleteMem = {};
    return await axios
      .post("/member/del", deleteMem, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
          "Cache-Control": "no-cache, no-store",
          Pragma: "no-cache",
        }, // 여기까지가 서버로 header를 실은 요청을 던지는 기능
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // 주소 수정
  updateAdd: async (address) => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);
    const updateData = {
      address: address,
    };
    return await axios
      .post("/member/updateAdd", updateData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        }, // 여기까지가 서버로 header를 실은 요청을 던지는 기능
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // 주소 수정 중복값 체크 (중복시 errorMsg)
  addRegCheck: async (address) => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);
    return await axios
      .get(`/member/addressCheck?address=${address}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        }, // 여기까지가 서버로 header를 실은 요청을 던지는 기능
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // 이미지 수정
  updateImg: async (email, img) => {
    const updateData = {
      email: email,
      img: img,
    };
    return await axios.post("/auth/member/updateImg", updateData);
  },

  // 내 게시글 조회
  getMyWrite: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);
    return await axios
      .get(`/member/communities`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        }, // 여기까지가 서버로 header를 실은 요청을 던지는 기능
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // 내 게시글 전체 삭제
  delMyWrite: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);
    return await axios
      .delete(`/member/deleteMyCommunities`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        }, // 여기까지가 서버로 header를 실은 요청을 던지는 기능
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // 내 게시글 선택 삭제
  deleteCommunitySelection: async (communityId) => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);
    return await axios
      .delete(`/member/delCommunity?communityId=${communityId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        }, // 여기까지가 서버로 header를 실은 요청을 던지는 기능
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // 내 댓글 조회
  getComment: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);
    return await axios
      .get(`/member/comments`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        }, // 여기까지가 서버로 header를 실은 요청을 던지는 기능
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // 내 댓글 전체 삭제
  delComment: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);
    return await axios
      .delete(`/member/deleteMyComments`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        }, // 여기까지가 서버로 header를 실은 요청을 던지는 기능
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // 내 댓글 선택 삭제
  deleteCommentSelection: async (commentId) => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);
    return await axios
      .delete(`/member/delComment?commentId=${commentId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        }, // 여기까지가 서버로 header를 실은 요청을 던지는 기능
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // 내 결제목록 조회(특산품)
  getPayment: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);
    return await axios
      .get(`/member/payments`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        }, // 여기까지가 서버로 header를 실은 요청을 던지는 기능
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // 내 큰손랭킹 조회
  myRichRanking: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);
    return await axios
      .get(`/member/ranking`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        }, // 여기까지가 서버로 header를 실은 요청을 던지는 기능
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  // 내 뱃지랭킹 조회
  myBadgeRanking: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);
    return await axios
      .get(`/member/ranking/badges`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        }, // 여기까지가 서버로 header를 실은 요청을 던지는 기능
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // 내 리뷰 조회
  getReview: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);
    return await axios
      .get(`/member/reviews`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        }, // 여기까지가 서버로 header를 실은 요청을 던지는 기능
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // 내 리뷰 전체 삭제
  delReview: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);
    return await axios
      .delete(`/member/deleteMyReview`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        }, // 여기까지가 서버로 header를 실은 요청을 던지는 기능
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // 내 리뷰 선택 삭제
  deleteReviewSelection: async (reviewId) => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);
    return await axios
      .delete(`/member/delReview?reviewId=${reviewId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        }, // 여기까지가 서버로 header를 실은 요청을 던지는 기능
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // 내 예약목록 조회
  getReservation: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);
    return await axios
      .get(`/member/activities`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        }, // 여기까지가 서버로 header를 실은 요청을 던지는 기능
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // 내 예약목록 삭제

  // 사용자의 알림 목록 가져오기(GET)
  getNotice: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);
    return await axios
      .get(`/member/noticeList`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        }, // 여기까지가 서버로 header를 실은 요청을 던지는 기능
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
export default MemberAPI;
