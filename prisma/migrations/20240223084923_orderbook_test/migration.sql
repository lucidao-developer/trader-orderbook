-- CreateTable
CREATE TABLE "orders_v4_nfts" (
    "id" TEXT NOT NULL,
    "maker" TEXT NOT NULL,
    "taker" TEXT NOT NULL DEFAULT '0x0000000000000000000000000000000000000000',
    "expiry" TEXT NOT NULL,
    "expiry_datetime" TIMESTAMP(3) NOT NULL,
    "nonce" TEXT NOT NULL,
    "erc20_token" TEXT NOT NULL,
    "erc20_token_amount" TEXT NOT NULL,
    "fees" JSONB,
    "nft_token" TEXT NOT NULL,
    "nft_token_id" TEXT NOT NULL,
    "nft_token_amount" TEXT NOT NULL,
    "nft_token_properties" JSONB,
    "system_metadata" JSONB,
    "app_metadata" JSONB,
    "chain_id" TEXT NOT NULL,
    "verifying_contract" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "signature" JSONB NOT NULL,
    "nft_type" TEXT NOT NULL,
    "app_id" TEXT,
    "date_created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "date_last_updated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "order_valid" BOOLEAN,
    "date_last_validated" TIMESTAMP(3),

    CONSTRAINT "orders_v4_nfts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_status_v4_nfts" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "block_number" BIGINT,
    "date_posted_to_db" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "order_status" TEXT NOT NULL,
    "nonce" TEXT NOT NULL,
    "block_hash" TEXT,
    "address" TEXT,
    "data" TEXT,
    "transaction_hash" TEXT,
    "signature" TEXT,
    "topic" TEXT,
    "name" TEXT,
    "parsed_args" JSONB,
    "chain_id" TEXT NOT NULL,
    "verifying_contract" TEXT NOT NULL,

    CONSTRAINT "order_status_v4_nfts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_records" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "job_name" TEXT NOT NULL,
    "chain_id" TEXT NOT NULL,
    "block_number" BIGINT NOT NULL,
    "hash" TEXT,
    "parent_hash" TEXT,
    "job_data" JSONB,
    "date_processed" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "verifying_contract" TEXT NOT NULL,

    CONSTRAINT "job_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blocks" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "number" BIGINT NOT NULL,
    "hash" TEXT NOT NULL,
    "parent_hash" TEXT NOT NULL,
    "nonce" TEXT NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "date_mined" TIMESTAMP(3) NOT NULL,
    "chain_id" TEXT NOT NULL,
    "date_processed_by_api" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nft_metadata" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "token_id" TEXT NOT NULL,
    "token_address" TEXT NOT NULL,
    "chain_id" TEXT NOT NULL,
    "token_uri" TEXT NOT NULL,
    "metadata" JSONB,
    "token_url" TEXT,
    "token_url_mime_type" TEXT,
    "name" TEXT,
    "description" TEXT,
    "content_url" TEXT,
    "content_url_mime_type" TEXT,
    "image_url" TEXT,
    "external_link" TEXT,
    "attributes" JSONB,
    "date_updated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nft_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "opensea_collection_metadata_by_contract_address_v1" (
    "address" TEXT NOT NULL,
    "collection" JSONB NOT NULL,
    "asset_contract_type" TEXT,
    "created_date" TEXT,
    "name" TEXT,
    "nft_version" TEXT,
    "opensea_version" TEXT,
    "owner" TEXT,
    "schema_name" TEXT,
    "symbol" TEXT,
    "total_supply" TEXT,
    "description" TEXT,
    "external_link" TEXT,
    "image_url" TEXT,
    "default_to_fiat" BOOLEAN,
    "dev_buyer_fee_basis_points" TEXT,
    "dev_seller_fee_basis_points" TEXT,
    "only_proxied_transfers" BOOLEAN,
    "opensea_buyer_fee_basis_points" TEXT,
    "opensea_seller_fee_basis_points" TEXT,
    "buyer_fee_basis_points" TEXT,
    "seller_fee_basis_points" TEXT,
    "payout_address" TEXT,
    "date_scrape_updated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "opensea_collection_metadata_by_contract_address_v1_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "opensea_collection_metadata_by_slug_v1" (
    "slug" TEXT NOT NULL,
    "name" TEXT,
    "external_link" TEXT,
    "description" TEXT,
    "image_url" TEXT,
    "primary_asset_contracts" JSONB,
    "editors" JSONB,
    "traits" JSONB,
    "stats" JSONB,
    "banner_image_url" TEXT,
    "chat_url" TEXT,
    "created_date" TIMESTAMP(3),
    "dev_buyer_fee_basis_points" TEXT,
    "dev_seller_fee_basis_points" TEXT,
    "discord_url" TEXT,
    "display_data" JSONB,
    "external_url" TEXT,
    "featured" BOOLEAN,
    "featured_image_url" TEXT,
    "hidden" BOOLEAN,
    "safelist_request_status" TEXT,
    "is_subject_to_whitelist" BOOLEAN,
    "large_image_url" TEXT,
    "medium_username" TEXT,
    "only_proxied_transfers" BOOLEAN,
    "opensea_buyer_fee_basis_points" TEXT,
    "payout_address" TEXT,
    "opensea_seller_fee_basis_points" TEXT,
    "require_email" BOOLEAN,
    "short_description" TEXT,
    "telegram_url" TEXT,
    "twitter_username" TEXT,
    "instagram_username" TEXT,
    "wiki_url" TEXT,
    "is_nsfw" BOOLEAN,
    "date_updated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "opensea_collection_metadata_by_slug_v1_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "orders_with_latest_status" (
    "maker" TEXT NOT NULL,
    "taker" TEXT NOT NULL,
    "expiry" TEXT NOT NULL,
    "expiry_datetime" TIMESTAMP(3) NOT NULL,
    "nonce" TEXT NOT NULL,
    "erc20_token" TEXT NOT NULL,
    "erc20_token_amount" TEXT NOT NULL,
    "fees" JSONB,
    "nft_token" TEXT NOT NULL,
    "nft_token_id" TEXT NOT NULL,
    "nft_token_amount" TEXT NOT NULL,
    "nft_token_properties" JSONB,
    "system_metadata" JSONB,
    "app_metadata" JSONB,
    "chain_id" TEXT NOT NULL,
    "verifying_contract" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "signature" JSONB NOT NULL,
    "nft_type" TEXT NOT NULL,
    "app_id" TEXT,
    "date_created" TIMESTAMP(3),
    "date_last_updated" TIMESTAMP(3),
    "order_valid" BOOLEAN,
    "date_last_validated" TIMESTAMP(3),
    "transaction_hash" TEXT,
    "block_number" BIGINT,
    "order_status" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "id" ON "orders_v4_nfts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_v4_nfts_nonce_key" ON "orders_v4_nfts"("nonce");

-- CreateIndex
CREATE UNIQUE INDEX "uniq_order_index" ON "orders_v4_nfts"("chain_id", "nonce", "erc20_token", "erc20_token_amount", "nft_token", "nft_token_amount");

-- CreateIndex
CREATE INDEX "order_status_block_num_idx" ON "order_status_v4_nfts"("block_number");

-- CreateIndex
CREATE INDEX "order_status_v4_nfts_nonce_index" ON "order_status_v4_nfts"("nonce");

-- CreateIndex
CREATE INDEX "order_status_v4_nfts_tx_hash" ON "order_status_v4_nfts"("transaction_hash");

-- CreateIndex
CREATE UNIQUE INDEX "comp" ON "order_status_v4_nfts"("block_hash", "order_status", "chain_id", "nonce");

-- CreateIndex
CREATE UNIQUE INDEX "job_record_idx" ON "job_records"("job_name", "chain_id", "block_number", "hash", "parent_hash");

-- CreateIndex
CREATE UNIQUE INDEX "unique_block_idx" ON "blocks"("chain_id", "number", "hash", "parent_hash", "nonce");

-- CreateIndex
CREATE UNIQUE INDEX "orders_with_latest_status_nonce_key" ON "orders_with_latest_status"("nonce");
