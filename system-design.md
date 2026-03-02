# System Design Document

## 1. Functional Requirements

User can:

Submit code

Get review

See score

Upload file

---

## 2. Non Functional Requirements

Scalable

Available

Reliable

Secure

---

## 3. Capacity Estimation

Users:

100,000

Requests per day:

500,000

Average request size:

10KB

---

## 4. Database Design

Users Table

Reviews Table

Files Table

---

## 5. API Design

POST /review

GET /review/{id}

---

## 6. Scaling Strategy

Horizontal scaling

Stateless backend

---

## 7. Bottlenecks

AI API latency

Solution:

Async processing

Caching

---

## 8. Load Balancing

AWS ELB

---

## 9. Caching Strategy

Redis

---

## 10. Future Improvements

GitHub integration

Realtime review