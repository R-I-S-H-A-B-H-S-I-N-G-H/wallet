import { config } from "dotenv";
import { GetObjectCommand, GetObjectCommandOutput, S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

config();

function getAwsCredentials() {
	const bucket = process.env.S3_BUCKET;
	const secretKey = process.env.S3_SECRET_KEY;
	const accessKeyId = process.env.S3_ACCESS_KEY_ID;
	const region = process.env.S3_REGION;
	const endpoint = process.env.S3_END_POINT;

	if (!bucket || !secretKey || !accessKeyId || !region || !endpoint) {
		throw new Error("Missing AWS S3 credentials in environment variables");
	}

	return {
		bucket,
		secretKey,
		accessKeyId,
		region,
		endpoint,
	};
}

function getBucket() {
	return getAwsCredentials().bucket;
}

function getEndpoint() {
	return getAwsCredentials().endpoint;
}

function getS3Client() {
	const { endpoint, secretKey, accessKeyId, region } = getAwsCredentials();
	const credentials = { accessKeyId, secretAccessKey: secretKey };

	const config: S3ClientConfig = { endpoint, credentials, region };
	return new S3Client(config);
}

export function getS3FilePath(filename: string) {
	return getEndpoint() + "/" + getBucket() + "/" + filename;
}

export interface S3PutPayLoad {
	Bucket: string;
	Key: string;
	Body: string;
	ContentType: string;
}

export function putObjectToS3(key: string, body: string, ContentType: string) {
	const Bucket = getBucket();
	if (!Bucket || !key || !body || !ContentType) throw new Error("Invalid PayLoad");

	const s3payload: S3PutPayLoad = { Bucket, Key: key, Body: body, ContentType };
	const s3Client = getS3Client();
	return s3Client.send(new PutObjectCommand(s3payload));
}

export async function getObjectFromS3(key: string): Promise<string> {
	const Bucket = getBucket();
	if (!Bucket || !key) throw new Error("Invalid parameters for S3 getObject");

	const getObjectCommand = new GetObjectCommand({ Bucket, Key: key });
	const s3Client = getS3Client();

	try {
		const response: GetObjectCommandOutput = await s3Client.send(getObjectCommand);

		// Convert the response body stream to a string
		const body = await streamToString(response.Body as Readable);
		return body;
	} catch (error) {
		throw new Error(`Failed to retrieve object from S3: ${error}`);
	}
}

async function streamToString(stream: Readable): Promise<string> {
	return new Promise((resolve, reject) => {
		const chunks: Uint8Array[] = [];
		stream.on("data", (chunk) => chunks.push(chunk));
		stream.on("error", reject);
		stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
	});
}
