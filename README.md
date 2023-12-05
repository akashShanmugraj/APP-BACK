# Activity Point Program


## Profile Routes

### Get All Profiles

```plaintext
GET /api/profiles/
```

**Description:**
Retrieve all profiles.

**Controller Method:**
`getProfiles`

### Get Profile by ID

```plaintext
GET /api/profiles/:id
```

**Parameters:**
- `id` (string): Profile ID.

**Description:**
Retrieve a profile by its ID.

**Controller Method:**
`getProfileById`

### Get Profile by Username

```plaintext
GET /api/profiles/:username
```

**Parameters:**
- `username` (string): Username of the profile owner.

**Description:**
Retrieve a profile by a specific username.

**Controller Method:**
`getProfileByUsername`

### Create a New Profile

```plaintext
POST /api/profiles/
```

**Description:**
Create a new profile.

**Controller Method:**
`createProfile`

### Update Profile by ID

```plaintext
PUT /api/profiles/:id
```

**Parameters:**
- `id` (string): Profile ID.

**Description:**
Update a profile by its ID.

**Controller Method:**
`updateProfile`

### Delete Profile by ID

```plaintext
DELETE /api/profiles/:id
```

**Parameters:**
- `id` (string): Profile ID.

**Description:**
Delete a profile by its ID.

**Controller Method:**
`deleteProfile`

These routes provide basic information about each endpoint, including the HTTP method, path, parameters (if any), and a brief description. Customize and expand the information based on your specific application's requirements.

---

## Post Routes

### Get All Posts

```plaintext
GET /api/posts/
```

**Description:**
Retrieve all posts.

**Controller Method:**
`getPosts`

### Get Post by ID

```plaintext
GET /api/posts/:id
```

**Parameters:**
- `id` (string): Post ID.

**Description:**
Retrieve a post by its ID.

**Controller Method:**
`getPostById`

### Get Posts by Username

```plaintext
GET /api/posts/:username
```

**Parameters:**
- `username` (string): Username of the post creator.

**Description:**
Retrieve posts by a specific username.

**Controller Method:**
`getPostByUsername`

### Create a New Post

```plaintext
POST /api/posts/
```

**Description:**
Create a new post.

**Controller Method:**
`createPost`

### Update Post by ID

```plaintext
PUT /api/posts/:id
```

**Parameters:**
- `id` (string): Post ID.

**Description:**
Update a post by its ID.

**Controller Method:**
`updatePost`

### Delete Post by ID

```plaintext
DELETE /api/posts/:id
```

**Parameters:**
- `id` (string): Post ID.

**Description:**
Delete a post by its ID.

**Controller Method:**
`deletePost`

These routes define basic CRUD operations for managing posts. Customize the information based on your specific application's requirements.

---


## Comment Routes

### Get All Comments

```plaintext
GET /api/comments/
```

**Description:**
Retrieve all comments.

**Controller Method:**
`getComments`

### Get Comment by ID

```plaintext
GET /api/comments/:id
```

**Parameters:**
- `id` (string): Comment ID.

**Description:**
Retrieve a comment by its ID.

**Controller Method:**
`getCommentById`

### Get Comments by Username

```plaintext
GET /api/comments/:username
```

**Parameters:**
- `username` (string): Username of the commenter.

**Description:**
Retrieve comments by a specific username.

**Controller Method:**
`getCommentByUsername`

### Create a New Comment

```plaintext
POST /api/comments/
```

**Description:**
Create a new comment.

**Controller Method:**
`createComment`

### Update Comment by ID

```plaintext
PUT /api/comments/:id
```

**Parameters:**
- `id` (string): Comment ID.

**Description:**
Update a comment by its ID.

**Controller Method:**
`updateComment`

### Delete Comment by ID

```plaintext
DELETE /api/comments/:id
```

**Parameters:**
- `id` (string): Comment ID.

**Description:**
Delete a comment by its ID.

**Controller Method:**
`deleteComment`

These routes provide basic information about each endpoint, including the HTTP method, path, parameters (if any), and a brief description. You can customize and expand the information based on your specific application's requirements.