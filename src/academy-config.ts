import type { AcademyConfig } from './model.ts';
export const config: AcademyConfig = {
  "id": "sports-academy",
  "slug": "sports",
  "name": "플레이온 스포츠 클럽",
  "englishName": "Sports Club",
  "category": "sports",
  "tagline": "한 번 더 뛰고, 함께 더 멀리.",
  "description": "수업 정원 · 예약 · 출석 · 회원권을 관리하는 스포츠 클럽",
  "accent": "#17694f",
  "tint": "#eaf4ec",
  "eyebrow": "MOVE TOGETHER, GROW TOGETHER",
  "primary": "Session",
  "metrics": [
    {
      "entity": "Student",
      "label": "클럽 멤버"
    },
    {
      "entity": "Session",
      "label": "개설 클래스"
    },
    {
      "entity": "Booking",
      "label": "예약 중",
      "status": "booked"
    },
    {
      "entity": "Booking",
      "label": "출석 완료",
      "status": "attended"
    }
  ],
  "entities": {
    "Student": {
      "label": "멤버",
      "description": "원생과 보호자의 연락처를 한곳에서 관리해요.",
      "icon": "○",
      "layout": "table",
      "fields": [
        {
          "name": "name",
          "label": "이름",
          "type": "text",
          "required": true
        },
        {
          "name": "phone",
          "label": "연락처",
          "type": "text",
          "required": false
        },
        {
          "name": "guardianName",
          "label": "보호자",
          "type": "text",
          "required": false
        },
        {
          "name": "guardianPhone",
          "label": "보호자 연락처",
          "type": "text",
          "required": false
        }
      ],
      "editFields": [
        "name",
        "phone",
        "guardianName",
        "guardianPhone"
      ]
    },
    "Session": {
      "label": "클래스 일정",
      "description": "클래스별 정원과 예약 현황을 확인해요.",
      "icon": "◷",
      "layout": "schedule",
      "fields": [
        {
          "name": "title",
          "label": "클래스",
          "type": "text",
          "required": true
        },
        {
          "name": "date",
          "label": "수업일",
          "type": "date",
          "required": true
        },
        {
          "name": "time",
          "label": "시간",
          "type": "time",
          "required": true
        },
        {
          "name": "coach",
          "label": "담당 코치",
          "type": "text",
          "required": true
        },
        {
          "name": "capacity",
          "label": "정원",
          "type": "number",
          "required": true,
          "min": 1,
          "max": 100
        }
      ]
    },
    "Booking": {
      "label": "예약 · 출석",
      "description": "정원을 초과하거나 같은 멤버가 중복 예약할 수 없어요.",
      "icon": "✓",
      "layout": "table",
      "fields": [
        {
          "name": "studentId",
          "label": "멤버",
          "type": "text",
          "required": true,
          "relation": "Student"
        },
        {
          "name": "sessionId",
          "label": "클래스",
          "type": "text",
          "required": true,
          "relation": "Session"
        },
        {
          "name": "status",
          "label": "상태",
          "type": "select",
          "readOnly": true,
          "options": [
            {
              "value": "booked",
              "label": "예약"
            },
            {
              "value": "attended",
              "label": "출석"
            },
            {
              "value": "cancelled",
              "label": "취소"
            }
          ]
        }
      ],
      "initialStatus": "booked",
      "actions": [
        {
          "id": "attend",
          "label": "출석 확인",
          "from": [
            "booked"
          ],
          "to": "attended"
        },
        {
          "id": "cancel",
          "label": "예약 취소",
          "from": [
            "booked"
          ],
          "to": "cancelled"
        }
      ]
    },
    "Membership": {
      "label": "회원권",
      "description": "이용 기간과 프로그램을 기록해요. 예약 자격은 자동 제한하지 않아요.",
      "icon": "◈",
      "layout": "cards",
      "fields": [
        {
          "name": "studentId",
          "label": "멤버",
          "type": "text",
          "required": true,
          "relation": "Student"
        },
        {
          "name": "title",
          "label": "프로그램",
          "type": "text",
          "required": true
        },
        {
          "name": "startDate",
          "label": "시작일",
          "type": "date",
          "required": true
        },
        {
          "name": "endDate",
          "label": "종료일",
          "type": "date",
          "required": true
        }
      ]
    },
    "Notice": {
      "label": "공지",
      "description": "학부모에게 전달할 내용을 정리해요. 실제 알림은 발송되지 않아요.",
      "icon": "↗",
      "layout": "cards",
      "fields": [
        {
          "name": "title",
          "label": "제목",
          "type": "text",
          "required": true
        },
        {
          "name": "date",
          "label": "게시일",
          "type": "date",
          "required": true
        },
        {
          "name": "content",
          "label": "내용",
          "type": "textarea",
          "required": true
        }
      ],
      "editFields": [
        "title",
        "date",
        "content"
      ]
    }
  },
  "timestamps": true
};
