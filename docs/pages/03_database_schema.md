<p><img src="/images/schema.png" alt="Database Schema"/></p>

Below is a brief description of each table in alphabetical order.

#### authentication_provider
This table describes the type of authentication with which a users account is linked. For example some users may register with Facebook and others via email.

#### category
A category into which videos are grouped. Each video belongs to a topic, and each topic belongs to a category. An example of a category is Business.

#### collocation
A string of 1 or more words that comes directly from a transcript. 

#### cued_video
Videos have a many-to-many relationship with users through the cued_video table. A cued_video is a video that the user has added to their dashboard. By querying cued_video, we can find the selected videos for each user and prevent them from adding the same video twice.

#### followers
Users have a many-to-many relationship with speakers through the followed_speakers table. Users are able to follow speakers. When a user decides to follow a speaker, the speaker and user are linked together in the followers table.

#### language
The Study Languages supported by Get Native. The user can change the current Study Language by hovering over the Study Language view in the bottom right corner of the screen when logged in. This table is also used for video organization.

#### like
Whenever a user likes a video a new like record is created to document which user liked which video.

#### listening_session
When a user completes the listening portion of the study session, a new listening session record is created to document that completion along with any statistical data was gathered.

#### notification
Notifications that are sent to users in that users can read by clicking the notifications button at the top right of the screen.

#### question
A question is a prompt that appears on the Writing page of the Study Session. Each question has a prewritten example answer which is also visible to the user on the Writing page. In response to a question, the user writes an answer.

#### shadowing_session
When a user completes the shadowing portion of the study session, a new listening session record is created to document that completion along with any statistical data was gathered.

#### speaker
Speakers are video interviewees. Users are able to specify a certain speaker when searching for videos. Users are also able to follow certain speakers and receive notifications when that speaker releases a new video.

#### speaking_session
When a user completes the shadowing portion of the study session, a new listening session record is created to document that completion along with any statistical data was gathered.

#### study_session
Every time a user chooses to study, a new study session is created. The tables listening session shadowing session speaking session in writing session are all linked to study session so that user statistics can be gathered efficiently.

#### topic
A topic groups a small number of videos together for easy organization and searching. Each video belongs to a topic and each topic belongs to a category. An example topic is talking to customers.

#### transcript
A transcript is a written transcription of a video interview. Even though a video has only 1 corresponding language, multiple transcripts can belong to the same video if they are translations.

#### usage_example
Each collocation has 1 or more usage examples. A usage example is an example of how to use a given collocation. Usage examples are displayed when clicking on a highlighted collocation in a transcript.

#### user
Users are entities who hold Get Native accounts and are capable of logging in to the website and using its functionality.

#### video
A video record documents the video within the get-native database. It contains information about the video as well as references to media assets that correspond to the video — such as thumbnail image and video URLs.

#### writing_session
When a user completes the writing portion of the study session, a new listening session record is created to document that completion along with any statistical data was gathered. A writing session record will, for example, hold the answer text provided by the user as well as word count and word per minute statistics.
