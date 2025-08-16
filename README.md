# 🛒 E-Ticaret Backend Projesi

Bu proje, **TypeScript + NestJS + Express.js + PostgreSQL + Prisma ORM** teknolojileri kullanılarak geliştirilmiş bir e-ticaret backend sistemidir.

Amacımız, adım adım genişletilen bir e-ticaret altyapısı geliştirmek ve temel üyelik, ürün, kategori, sepet, sipariş ve stok yönetimi özelliklerini desteklemektir.

---

## 🚀 Kullanılan Teknolojiler

* **Dil:** TypeScript
* **Framework:** NestJS (Express.js tabanlı)
* **Veri Tabanı:** PostgreSQL
* **ORM:** Prisma ORM
* **Kimlik Doğrulama:** Passport.js + JWT (Refresh Token Rotation destekli)

---

## 📂 Proje Kurulumu

1. Projeyi klonlayın:

   ```bash
   git clone https://github.com/kullanici/ecommerce-backend.git
   cd ecommerce-backend
   ```

2. Gerekli bağımlılıkları yükleyin:

   ```bash
   npm install
   ```

3. `.env` dosyasını oluşturun:

   ```env
   DATABASE_URL="postgresql://kullanici:sifre@localhost:5432/ecommerce_db?schema=public"
   JWT_SECRET="super-secret-key"
   JWT_REFRESH_SECRET="super-refresh-secret"
   ```

4. Prisma ile veri tabanı tablolarını oluşturun:

   ```bash
   npx prisma migrate dev --name init
   ```

5. Uygulamayı başlatın:

   ```bash
   npm run start:dev
   ```

API, varsayılan olarak `http://localhost:3000/api` üzerinden çalışacaktır.

---

## 📑 Veri Tabanı Yapısı

### Kullanıcılar (users)

* id
* first\_name
* last\_name
* full\_name
* username
* email
* password (hashlenmiş)
* role (ADMIN / MODERATOR / USER) *(varsayılan: USER)*
* created\_at
* updated\_at

### Kategoriler (categories)

* id
* name
* slug
* order
* created\_at
* updated\_at

### Ürünler (products)

* id
* category\_id
* name
* slug
* short\_description
* long\_description
* price
* stock\_quantity
* primary\_photo\_url
* comment\_count
* average\_rating
* created\_at
* updated\_at

### Ürün Fotoğrafları (product\_photos)

* id
* product\_id
* is\_primary (boolean)
* url
* size
* order
* created\_at
* updated\_at

### Ürün Yorumları (product\_comments)

* id
* user\_id
* product\_id
* title (nullable)
* content (nullable)
* rating (1-5)
* created\_at
* updated\_at

### Sepet (cart\_items)

* id
* user\_id
* product\_id
* quantity
* created\_at
* updated\_at

### Siparişler (orders)

* id
* user\_id
* total\_price
* status (PENDING, PAID, SHIPPED, DELIVERED, CANCELLED)
* created\_at
* updated\_at

### Sipariş Kalemleri (order\_items)

* id
* order\_id
* product\_id
* quantity
* unit\_price
* created\_at
* updated\_at

---

## 📌 API Endpointleri

Tüm endpointlerin başında `/api` prefix’i bulunur.

### 🔑 Auth

* **POST** `/api/auth/register` → Yeni kullanıcı kaydı
* **POST** `/api/auth/login` → Kullanıcı girişi
* **GET** `/api/auth/me` → Mevcut kullanıcı bilgisi
* **POST** `/api/auth/logout` → Çıkış
* **POST** `/api/auth/logout-all` → Tüm oturumlardan çıkış

### 👤 Kullanıcılar

* **GET** `/api/users` → Kullanıcı listeleme
* **GET** `/api/users/:id` → Kullanıcı görüntüleme
* **PATCH** `/api/users/:id` → Kullanıcı güncelleme

### 🏷️ Kategoriler

* **POST** `/api/categories` → Kategori oluşturma
* **GET** `/api/categories` → Kategori listeleme
* **GET** `/api/categories/:id` → Kategori görüntüleme
* **PATCH** `/api/categories/:id` → Kategori güncelleme
* **DELETE** `/api/categories/:id` → Kategori silme

### 📦 Ürünler

* **POST** `/api/products` → Ürün oluşturma
* **GET** `/api/products` → Ürün listeleme (filtreleme & sıralama destekli)
* **GET** `/api/products/:id` → Ürün görüntüleme
* **PATCH** `/api/products/:id` → Ürün güncelleme
* **DELETE** `/api/products/:id` → Ürün silme

### 🖼️ Ürün Fotoğrafları

* **POST** `/api/product-photos` → Ürün fotoğrafı ekleme
* **PATCH** `/api/product-photos/:id` → Fotoğraf güncelleme (sıra, birincil)
* **DELETE** `/api/product-photos/:id` → Fotoğraf silme

### 💬 Ürün Yorumları

* **POST** `/api/comments` → Yorum ekleme
* **GET** `/api/comments` → Yorum listeleme (product\_id & rating filtreli)
* **GET** `/api/comments/:id` → Yorum görüntüleme
* **PATCH** `/api/comments/:id` → Yorum güncelleme
* **DELETE** `/api/comments/:id` → Yorum silme

### 🛒 Sepet

* **POST** `/api/cart-items` → Sepete ürün ekleme
* **GET** `/api/cart-items` → Sepeti listeleme
* **PATCH** `/api/cart-items/:id` → Sepeti güncelleme
* **DELETE** `/api/cart-items/:id` → Sepetten ürün silme
* **DELETE** `/api/cart-items` → Sepeti temizleme

### 📦 Siparişler

* **POST** `/api/orders` → Sipariş oluşturma (sepet → sipariş dönüşümü)
* **GET** `/api/orders` → Sipariş listeleme
* **GET** `/api/orders/:id` → Sipariş görüntüleme
* **PATCH** `/api/orders/:id` → Sipariş güncelleme (status)

---

## 🔍 Ürün Filtreleme & Sıralama

Ürünler listelenirken query string ile filtreleme ve sıralama yapılabilir:

* **Filtreleme:**

  * `category_id`
  * `min_price`, `max_price`
  * `min_rating`

* **Sıralama:**

  * `sort=price_asc`
  * `sort=price_desc`
  * `sort=rating_desc`
  * `sort=newest`

Örnek:

```http
GET /api/products?category_id=2&min_price=100&max_price=500&sort=price_asc
```

---

## 🔮 Gelecek Aşamalar

* Kullanıcı rollerine göre **yetkilendirme** kurallarının eklenmesi
* Ödeme entegrasyonu
* Ürün fotoğrafları için **responsive varyantlar**
* Admin paneli için ek API’ler

---

