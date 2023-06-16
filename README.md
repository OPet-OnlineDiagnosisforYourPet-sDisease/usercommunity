# usercommunity

# https://usercommunity-iu6qufuohq-uc.a.run.app

# Register
# URL
  /register
# Method
  POST
# Request Body
  Name as string
  Email as string, must be unique
  Password as string, must be at least 8 characters
# Response
# Ex: jika berhasil
#  {
    "message": "Registration successful",
    "error": false
#  }
# Ex: jika email sudah digunakan
# {
    "message": "Email already exists",
    "error": true
# }
# Ex: jika password kurang dari 8 karakter
# {
    "message": "Password must be at least 8 characters",
    "error": true
# }

# Login
# URL
  /login
# Method
  POST
# Request Body
  Email as string
  Password as string
# Response
# Ex: jika email dan password benar
# {
    "message": "Login successful",
    "error": false,
    "loginResult": {
        "email": "rozi123@gmail.com",
        "username": "rozi",
        "profil": "https://storage.googleapis.com/photoprofil/kitten.png",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvemkxMjNAZ21haWwuY29tIiwiaWF0IjoxNjg2OTE4MDMzfQ.UUVQQM_xCxe9_K3pd9hu7z2B62AHTgEQuFsVENcI2_o"
    }
# }
# Ex: Jika email atau password salah
# {
    "message": "Invalid email or password",
    "error": true
# }

# Ubah Foto Profil
# URL
  /profile/poto
# Method
  POST
# Headers
  Content-Type: multipart/form-data
  Authorization: (token)
  Key: photoProfile
  Value: file photo
# Request Body
  photo as file
# Response
# {
    "message": "Profile photo uploaded successfully",
    "profil": "https://storage.googleapis.com/photoprofil/article2.jpg",
    "error": false
# }

# Add Stories
# URL
  /stories
# Method
  POST
# Headers
  Content-Type: multipart/form-data
  Authorization: (token)
# Request Body
  description as string
  photo as file
  lat as float, optional
  lon as float, optional
# Response
# {
    "message": "Story added successfully",
    "error": false
# }

# Get Stories
# URL
  /stories
# Method
  GET
# Parameters
  page as int, optional
  size as int, optional
  location as 1 | 0, optional, default 0
  Notes:
  1 for get all stories with location
  0 for all stories without considering location
# Response
# Ex: get semua stories (/stories)
# {
    "error": false,
    "message": "Stories berhasil didapatkan",
    "stories": [
        {
            "id": 50,
            "description": "My First Stories",
            "photo": "https://storage.googleapis.com/photocommunity/kitten.png",
            "lat": -0.374743,
            "lon": 102.547636,
            "user_id": "rozi123@gmail.com",
            "created_at": "Jun 16, 2023, 7:26:41 PM",
            "sender_name": "rozi",
            "sender_profil": "https://storage.googleapis.com/photoprofil/article2.jpg",
            "like_count": 0,
            "comment_count": 0
        },
        {
            "id": 49,
            "description": "teman-teman ada yang tahu gak ini kenapa bisa begini?",
            "photo": "https://storage.googleapis.com/photocommunity/16-Jun-20231323389864623045183.jpg",
            "lat": -0.374737,
            "lon": 102.547436,
            "user_id": "opet123@gmail.com",
            "created_at": "Jun 16, 2023, 11:14:45 AM",
            "sender_name": "opet",
            "sender_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
            "like_count": 0,
            "comment_count": 0
        },
        {
            "id": 48,
            "description": "Kenapa kucingku mengeong terus ya padahal udah makan banyak :(",
            "photo": "https://storage.googleapis.com/photocommunity/14-Jun-20236343460670833373787.jpg",
            "lat": null,
            "lon": null,
            "user_id": "niken@gmail.com",
            "created_at": "Jun 14, 2023, 7:02:42 PM",
            "sender_name": "Niken Ayu",
            "sender_profil": "https://storage.googleapis.com/photoprofil/14-Jun-202382310931627170119.jpg",
            "like_count": 0,
            "comment_count": 3
        },
        {
            "id": 47,
            "description": "Halo, kucingku beberapa hari ini mencret, sebaiknya kucingku diberi makan apa ya? atau ada pantangan yang gaboleh dimakan kucingku ",
            "photo": "https://storage.googleapis.com/photocommunity/14-Jun-20231962190970839647894.jpg",
            "lat": null,
            "lon": null,
            "user_id": "mipanyakakus@gmail.com",
            "created_at": "Jun 14, 2023, 5:35:59 PM",
            "sender_name": "mipanzuzu",
            "sender_profil": null,
            "like_count": 0,
            "comment_count": 2
        },
        {
            "id": 46,
            "description": "kucingku lemas banget gamau makan gamau minum, kenapa ya?",
            "photo": "https://storage.googleapis.com/photocommunity/14-Jun-20233869703928430731014.jpg",
            "lat": null,
            "lon": null,
            "user_id": "alditaherrr@gmail.com",
            "created_at": "Jun 14, 2023, 5:28:29 PM",
            "sender_name": "Alditaher",
            "sender_profil": "https://storage.googleapis.com/photoprofil/14-Jun-20234011993444842331267.jpg",
            "like_count": 0,
            "comment_count": 2
        },
        {
            "id": 45,
            "description": "Hey human, lihatlah mataku yang sungguh menawan ini",
            "photo": "https://storage.googleapis.com/photocommunity/09-Jun-20235804762394449486593.jpg",
            "lat": null,
            "lon": null,
            "user_id": "cakep@gmail.com",
            "created_at": "Jun 9, 2023, 3:04:30 PM",
            "sender_name": "orang cakep",
            "sender_profil": "https://storage.googleapis.com/photoprofil/14-Jun-2023609510677977039236.jpg",
            "like_count": 1,
            "comment_count": 43
        },
        {
            "id": 44,
            "description": "coba",
            "photo": "https://storage.googleapis.com/photocommunity/flea.jpg",
            "lat": null,
            "lon": null,
            "user_id": "rozi123@gmail.com",
            "created_at": "Jun 9, 2023, 3:03:24 PM",
            "sender_name": "rozi",
            "sender_profil": "https://storage.googleapis.com/photoprofil/article2.jpg",
            "like_count": 1,
            "comment_count": 9
        },
        {
            "id": 43,
            "description": "coba",
            "photo": "https://storage.googleapis.com/photocommunity/article3.jpg",
            "lat": null,
            "lon": null,
            "user_id": "rozi123@gmail.com",
            "created_at": "Jun 9, 2023, 3:03:02 PM",
            "sender_name": "rozi",
            "sender_profil": "https://storage.googleapis.com/photoprofil/article2.jpg",
            "like_count": 0,
            "comment_count": 1
        },
        {
            "id": 42,
            "description": "coba",
            "photo": "https://storage.googleapis.com/photocommunity/article3.jpg",
            "lat": null,
            "lon": null,
            "user_id": "rozi123@gmail.com",
            "created_at": "Jun 9, 2023, 3:02:07 PM",
            "sender_name": "rozi",
            "sender_profil": "https://storage.googleapis.com/photoprofil/article2.jpg",
            "like_count": 0,
            "comment_count": 0
        },
        {
            "id": 41,
            "description": "vhh",
            "photo": "https://storage.googleapis.com/photocommunity/09-Jun-20238028149640757019361.jpg",
            "lat": null,
            "lon": null,
            "user_id": "opet123@gmail.com",
            "created_at": "Jun 9, 2023, 2:56:19 PM",
            "sender_name": "opet",
            "sender_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
            "like_count": 0,
            "comment_count": 3
        },
        {
            "id": 40,
            "description": "tes bg",
            "photo": "https://storage.googleapis.com/photocommunity/08-Jun-20235985755658695693640.jpg",
            "lat": null,
            "lon": null,
            "user_id": "opet@gmail.com",
            "created_at": "Jun 8, 2023, 11:57:57 PM",
            "sender_name": "opet opet",
            "sender_profil": "https://storage.googleapis.com/photoprofil/12-Jun-20238249714501206487033.jpg",
            "like_count": 0,
            "comment_count": 2
        },
        {
            "id": 39,
            "description": "Kucingku terlihat sangat kurus, padahal makannya teratur.",
            "photo": "https://storage.googleapis.com/photocommunity/08-Jun-20237698055539745890224.jpg",
            "lat": null,
            "lon": null,
            "user_id": "test@gmail.com",
            "created_at": "Jun 8, 2023, 4:02:27 PM",
            "sender_name": "test",
            "sender_profil": "https://storage.googleapis.com/photoprofil/article1.jpg",
            "like_count": 2,
            "comment_count": 2
        }
    ]
# }
# Ex: get dengan paging dan size (/stories?page=1&size=3)
# {
    "error": false,
    "message": "Stories berhasil didapatkan",
    "stories": [
        {
            "id": 50,
            "description": "My First Stories",
            "photo": "https://storage.googleapis.com/photocommunity/kitten.png",
            "lat": -0.374743,
            "lon": 102.547636,
            "user_id": "rozi123@gmail.com",
            "created_at": "Jun 16, 2023, 7:26:41 PM",
            "sender_name": "rozi",
            "sender_profil": "https://storage.googleapis.com/photoprofil/article2.jpg",
            "like_count": 0,
            "comment_count": 0
        },
        {
            "id": 49,
            "description": "teman-teman ada yang tahu gak ini kenapa bisa begini?",
            "photo": "https://storage.googleapis.com/photocommunity/16-Jun-20231323389864623045183.jpg",
            "lat": -0.374737,
            "lon": 102.547436,
            "user_id": "opet123@gmail.com",
            "created_at": "Jun 16, 2023, 11:14:45 AM",
            "sender_name": "opet",
            "sender_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
            "like_count": 0,
            "comment_count": 0
        },
        {
            "id": 48,
            "description": "Kenapa kucingku mengeong terus ya padahal udah makan banyak :(",
            "photo": "https://storage.googleapis.com/photocommunity/14-Jun-20236343460670833373787.jpg",
            "lat": null,
            "lon": null,
            "user_id": "niken@gmail.com",
            "created_at": "Jun 14, 2023, 7:02:42 PM",
            "sender_name": "Niken Ayu",
            "sender_profil": "https://storage.googleapis.com/photoprofil/14-Jun-202382310931627170119.jpg",
            "like_count": 0,
            "comment_count": 3
        }
    ]
# }
# Ex: Melihat postingan berdasarkan nama yang posting (/stories?email=cakep@gmail.com)
# {
    "error": false,
    "message": "Stories berhasil didapatkan",
    "stories": [
        {
            "id": 45,
            "description": "Hey human, lihatlah mataku yang sungguh menawan ini",
            "photo": "https://storage.googleapis.com/photocommunity/09-Jun-20235804762394449486593.jpg",
            "lat": null,
            "lon": null,
            "user_id": "cakep@gmail.com",
            "created_at": "Jun 9, 2023, 3:04:30 PM",
            "sender_name": "orang cakep",
            "sender_profil": "https://storage.googleapis.com/photoprofil/14-Jun-2023609510677977039236.jpg",
            "like_count": 1,
            "comment_count": 43
        }
    ]
# }
# Ex: Melihat stories berdasarkan id stories (/stories/45)
# {
    "error": false,
    "message": "Story berhasil didapatkan",
    "story": {
        "id": 45,
        "description": "Hey human, lihatlah mataku yang sungguh menawan ini",
        "photo": "https://storage.googleapis.com/photocommunity/09-Jun-20235804762394449486593.jpg",
        "lat": null,
        "lon": null,
        "user_id": "cakep@gmail.com",
        "created_at": "Jun 9, 2023, 3:04:30 PM",
        "sender_name": "orang cakep",
        "sender_profil": "https://storage.googleapis.com/photoprofil/14-Jun-2023609510677977039236.jpg",
        "comments": [
            {
                "id": 2,
                "story_id": 45,
                "user_email": "rozi456@gmail.com",
                "comment": "bohong bohong",
                "commenter_name": "rozi",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/article2.jpg",
                "comment_time": "Jun 10, 2023, 12:16:00 PM"
            },
            {
                "id": 3,
                "story_id": 45,
                "user_email": "rozi456@gmail.com",
                "comment": "bohong bohong",
                "commenter_name": "rozi",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/article2.jpg",
                "comment_time": "Jun 10, 2023, 12:17:47 PM"
            },
            {
                "id": 4,
                "story_id": 45,
                "user_email": "rozi456@gmail.com",
                "comment": "bohong bohong",
                "commenter_name": "rozi",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/article2.jpg",
                "comment_time": "Jun 10, 2023, 12:17:50 PM"
            },
            {
                "id": 5,
                "story_id": 45,
                "user_email": "rozi456@gmail.com",
                "comment": "bohong bohong",
                "commenter_name": "rozi",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/article2.jpg",
                "comment_time": "Jun 10, 2023, 12:25:04 PM"
            },
            {
                "id": 6,
                "story_id": 45,
                "user_email": "opet@gmail.com",
                "comment": "good",
                "commenter_name": "opet opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/12-Jun-20238249714501206487033.jpg",
                "comment_time": "Jun 10, 2023, 5:45:58 PM"
            },
            {
                "id": 7,
                "story_id": 45,
                "user_email": "opet@gmail.com",
                "comment": null,
                "commenter_name": "opet opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/12-Jun-20238249714501206487033.jpg",
                "comment_time": "Jun 10, 2023, 5:50:05 PM"
            },
            {
                "id": 8,
                "story_id": 45,
                "user_email": "opet@gmail.com",
                "comment": "test",
                "commenter_name": "opet opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/12-Jun-20238249714501206487033.jpg",
                "comment_time": "Jun 11, 2023, 8:36:07 AM"
            },
            {
                "id": 10,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "bisa gk sih",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 11, 2023, 9:01:16 AM"
            },
            {
                "id": 11,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "bisa gk sih",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 11, 2023, 9:01:23 AM"
            },
            {
                "id": 12,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "tes",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 11, 2023, 9:07:51 AM"
            },
            {
                "id": 13,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "hai",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 11, 2023, 9:08:06 AM"
            },
            {
                "id": 14,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "h",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 11, 2023, 9:09:02 AM"
            },
            {
                "id": 9,
                "story_id": 45,
                "user_email": "rozi456@gmail.com",
                "comment": "bohong bohong",
                "commenter_name": "rozi",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/article2.jpg",
                "comment_time": "Jun 11, 2023, 3:58:49 PM"
            },
            {
                "id": 15,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "bismillah",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 11, 2023, 4:23:22 PM"
            },
            {
                "id": 16,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "hahahah",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 11, 2023, 4:26:48 PM"
            },
            {
                "id": 17,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "hehe",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 11, 2023, 4:28:41 PM"
            },
            {
                "id": 20,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "yee Alhamdulilla berhasil",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 11, 2023, 4:33:38 PM"
            },
            {
                "id": 21,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "hahahha keren",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 11, 2023, 4:33:44 PM"
            },
            {
                "id": 22,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "yee Alhamdulilla berhasil",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 11, 2023, 4:35:01 PM"
            },
            {
                "id": 23,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "hahahha keren",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 11, 2023, 4:35:01 PM"
            },
            {
                "id": 24,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "selangkah menuju instagram",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 11, 2023, 4:35:40 PM"
            },
            {
                "id": 25,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "selangkah menuju instagram",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 11, 2023, 5:19:59 PM"
            },
            {
                "id": 26,
                "story_id": 45,
                "user_email": "opet@gmail.com",
                "comment": "bisa gak top 5",
                "commenter_name": "opet opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/12-Jun-20238249714501206487033.jpg",
                "comment_time": "Jun 11, 2023, 11:58:18 PM"
            },
            {
                "id": 27,
                "story_id": 45,
                "user_email": "opet@gmail.com",
                "comment": "yes",
                "commenter_name": "opet opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/12-Jun-20238249714501206487033.jpg",
                "comment_time": "Jun 12, 2023, 12:12:12 AM"
            },
            {
                "id": 28,
                "story_id": 45,
                "user_email": "opet@gmail.com",
                "comment": "he",
                "commenter_name": "opet opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/12-Jun-20238249714501206487033.jpg",
                "comment_time": "Jun 12, 2023, 12:15:40 AM"
            },
            {
                "id": 29,
                "story_id": 45,
                "user_email": "opet@gmail.com",
                "comment": "mas rozi",
                "commenter_name": "opet opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/12-Jun-20238249714501206487033.jpg",
                "comment_time": "Jun 12, 2023, 12:15:59 AM"
            },
            {
                "id": 30,
                "story_id": 45,
                "user_email": "opet@gmail.com",
                "comment": "halo gais kucing ku juga gitu kemarin mati dia hahahahaha",
                "commenter_name": "opet opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/12-Jun-20238249714501206487033.jpg",
                "comment_time": "Jun 12, 2023, 12:22:07 AM"
            },
            {
                "id": 32,
                "story_id": 45,
                "user_email": "opet@gmail.com",
                "comment": "ha",
                "commenter_name": "opet opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/12-Jun-20238249714501206487033.jpg",
                "comment_time": "Jun 12, 2023, 12:37:27 AM"
            },
            {
                "id": 37,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "hahahahah",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 14, 2023, 4:59:05 PM"
            },
            {
                "id": 38,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "heheheh",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 14, 2023, 4:59:30 PM"
            },
            {
                "id": 39,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "hahahaha lagi",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 14, 2023, 4:59:41 PM"
            },
            {
                "id": 40,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "kok bisa",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 14, 2023, 4:59:56 PM"
            },
            {
                "id": 41,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "ini bisa",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 14, 2023, 5:00:06 PM"
            },
            {
                "id": 42,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "bisa sih",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 14, 2023, 5:03:09 PM"
            },
            {
                "id": 43,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "bug terus",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 14, 2023, 5:03:22 PM"
            },
            {
                "id": 44,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "hehehe",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 14, 2023, 5:03:28 PM"
            },
            {
                "id": 45,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "hahahaha",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 14, 2023, 5:03:33 PM"
            },
            {
                "id": 46,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "hehehwhe",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 14, 2023, 5:03:39 PM"
            },
            {
                "id": 47,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "bismillah",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 14, 2023, 5:03:44 PM"
            },
            {
                "id": 48,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "bismillahirrahmanirrahim",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 14, 2023, 5:04:01 PM"
            },
            {
                "id": 49,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "hahahaha",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 14, 2023, 5:04:12 PM"
            },
            {
                "id": 50,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "jajajajaj",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 14, 2023, 5:04:22 PM"
            },
            {
                "id": 52,
                "story_id": 45,
                "user_email": "opet123@gmail.com",
                "comment": "Hhahahaha",
                "commenter_name": "opet",
                "commenter_profil": "https://storage.googleapis.com/photoprofil/16-Jun-2023343911109880392229.jpg",
                "comment_time": "Jun 14, 2023, 5:09:40 PM"
            }
        ],
        "comment_count": 43,
        "user_profile": "https://storage.googleapis.com/photoprofil/14-Jun-2023609510677977039236.jpg"
    },
    "user_profile": "https://storage.googleapis.com/photoprofil/14-Jun-2023609510677977039236.jpg"
# }

# Kirim Komentar
# URL
  /stories/:id/comment
# Method
  POST
# Headers
  Content-Type: multipart/form-data
  Authorization: (token)
  Key: comment
  Value: Isi komentar
# Response
# {
    "message": "Comment added successfully",
    "error": false
# }
