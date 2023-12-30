-- CreateTable
CREATE TABLE "DislikedProfile" (
    "player_id" INTEGER NOT NULL,
    "disliked_player_id" INTEGER NOT NULL,

    CONSTRAINT "DislikedProfile_pkey" PRIMARY KEY ("player_id","disliked_player_id")
);

-- CreateTable
CREATE TABLE "LikedProfile" (
    "player_id" INTEGER NOT NULL,
    "liked_player_id" INTEGER NOT NULL,

    CONSTRAINT "LikedProfile_pkey" PRIMARY KEY ("player_id","liked_player_id")
);

-- CreateTable
CREATE TABLE "MatchedProfile" (
    "player_id_1" INTEGER NOT NULL,
    "player_id_2" INTEGER NOT NULL,

    CONSTRAINT "MatchedProfile_pkey" PRIMARY KEY ("player_id_1","player_id_2")
);

-- AddForeignKey
ALTER TABLE "DislikedProfile" ADD CONSTRAINT "DislikedProfile_disliked_player_id_fkey" FOREIGN KEY ("disliked_player_id") REFERENCES "Player"("player_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DislikedProfile" ADD CONSTRAINT "DislikedProfile_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("player_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LikedProfile" ADD CONSTRAINT "LikedProfile_liked_player_id_fkey" FOREIGN KEY ("liked_player_id") REFERENCES "Player"("player_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LikedProfile" ADD CONSTRAINT "LikedProfile_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("player_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "MatchedProfile" ADD CONSTRAINT "MatchedProfile_player_id_1_fkey" FOREIGN KEY ("player_id_1") REFERENCES "Player"("player_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "MatchedProfile" ADD CONSTRAINT "MatchedProfile_player_id_2_fkey" FOREIGN KEY ("player_id_2") REFERENCES "Player"("player_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
