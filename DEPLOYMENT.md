# Firebase Deployment Guide

## Обща информация

Този проект е конфигуриран за деплой във Firebase Hosting.

- **Firebase Project ID**: web-v01
- **Hosting Directory**: `public/`

## Конфигурационни файлове

### firebase.json
Съдържа настройките за Firebase Hosting:
- Сървира файлове от `public/` директорията
- Пренасочва всички заявки към `index.html` (SPA behavior)
- Настройва кеширане за JS и CSS файлове

### .firebaserc
Свързва локалния проект с Firebase проекта `web-v01`.

## Процес на деплой

### 1. Подготовка на файловете

Преди деплой, файловете от `src/` се копират в `public/src/`:

```bash
npm run prepare-deploy
```

Това гарантира, че всички JavaScript модули и стилове са налични в правилната директория за сървиране.

### 2. Деплой

#### Пълен деплой (препоръчително):
```bash
npm run deploy
```

Тази команда:
1. Изпълнява `prepare-deploy` скрипта
2. Деплойва всички Firebase услуги

#### Само Hosting:
```bash
npm run deploy:hosting
```

Деплойва само статичните файлове в Firebase Hosting.

#### Ръчен деплой:
```bash
firebase deploy --only hosting
```

## Проверка след деплой

След успешен деплой, Firebase ще покаже URL адреса на приложението:
- **Hosting URL**: https://web-v01.web.app
- **Алтернативен URL**: https://web-v01.firebaseapp.com

Отворете URL адреса в браузър за да проверите дали приложението работи правилно.

## Решаване на проблеми

### Грешка: "Firebase command not found"

Инсталирайте Firebase CLI глобално:
```bash
npm install -g firebase-tools
```

### Грешка: Authentication error

Логнете се отново във Firebase:
```bash
firebase login
```

### Грешка: Project not found

Уверете се, че проектът `web-v01` съществува във вашия Firebase акаунт и че имате достъп до него.

### Файловете не се обновяват

1. Изчистете кеша на Firebase:
   ```bash
   firebase hosting:disable
   firebase hosting:enable
   ```

2. Изчистете кеша на браузъра или проверете в режим incognito.

## Локално тестване

Преди деплой, можете да тествате приложението локално:

```bash
npm run dev
```

Това стартира локален сървър на порт 5173.

## Версиониране

При всеки деплой, Firebase запазва предишната версия. Можете да върнете към предишна версия от Firebase Console:

1. Отворете Firebase Console
2. Изберете проекта `web-v01`
3. Отидете в Hosting секцията
4. Изберете "Release history"
5. Изберете версията която искате да възстановите

## Допълнителна информация

- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)
