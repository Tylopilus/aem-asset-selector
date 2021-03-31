export interface Image {
  'jcr:primaryType': string;
  'jcr:mixinTypes': string[];
  'jcr:createdBy': string;
  'jcr:created': string;
  'jcr:uuid': string;
  'jcr:content': JcrContent;
}

export interface JcrContent {
  'jcr:primaryType': string;
  'jcr:mixinTypes': string[];
  'cq:lastReplicationAction': string;
  'cq:lastReplicatedBy': string;
  'jcr:lastModifiedBy': string;
  status: string;
  'ips-job-handle': string[];
  'cq:lastReplicated': string;
  'dam:imageServerAsset': boolean;
  'dam:s7damType': string;
  'dam:assetState': string;
  'jcr:lastModified': string;
  renditions: Renditions;
  related: Related;
  metadata: Metadata;
}

export interface Metadata {
  'jcr:primaryType': string;
  'jcr:mixinTypes': string[];
  'psAux:LensInfo': string;
  'jcr:title': string;
  'dc:creator': string[];
  'psAux:SerialNumber': string;
  'dam:Physicalheightininches': string;
  'tiff:Compression': number;
  'tiff:Make': string;
  'dam:Physicalwidthininches': string;
  'exifEX:LensSpecification': string[];
  'exifEX:PhotographicSensitivity': number;
  'exif:CustomRendered': number;
  'photoshop:DateCreated': string;
  'dam:Fileformat': string;
  'exif:MaxApertureValue': string;
  'dam:Progressive': string;
  'dc:Rights': string;
  'exif:FNumber': string;
  'tiff:PlanarConfiguration': number;
  'tiff:ImageLength': number;
  'tiff:YResolution': string;
  'exif:ShutterSpeedValue': string;
  'exif:FocalLength': string;
  'exif:ColorSpace': number;
  'xmp:CreatorTool': string;
  'photoshop:Instructions': string;
  'dam:scene7CompanyID': string;
  'dam:scene7PublishedBy': string;
  'dam:extracted': string;
  'dc:format': string;
  'exif:FocalPlaneXResolution': string;
  'dam:SpecialInstructions': string;
  'dc:description': string;
  'dam:Bitsperpixel': number;
  'exif:ISOSpeedRatings': number[];
  'exif:ExifVersion': string;
  'psAux:Lens': string;
  'dam:scene7ID': string;
  'photoshop:Credit': string;
  'dc:rights': string;
  'dc:subject': string[];
  'dam:scene7CloudConfigPath': string;
  'dc:date_xmpArrayType': string;
  'dam:MIMEtype': string;
  'tiff:Orientation': number;
  'exifEX:LensModel': string;
  'exif:FocalPlaneResolutionUnit': number;
  'photoshop:URL': string;
  'plus:LicsensorURL': string;
  'dam:Physicalwidthindpi': number;
  'photoshop:Source': string;
  'dam:Physicalheightindpi': number;
  'dam:scene7FileStatus': string;
  'tiff:ResolutionUnit': number;
  Dlref: string;
  'photoshop:CopyrightFlag': string;
  'dam:scene7File': string;
  'dam:scene7Name': string;
  'dam:scene7Type': string;
  'dam:Numberofimages': number;
  'exif:ExposureMode': number;
  'exif:ExposureTime': string;
  'tiff:XResolution': string;
  'dc:subject_xmpArrayType': string;
  'exif:PixelYDimension': number;
  'exif:ExposureBiasValue': string;
  'exifEX:BodySerialNumber': number;
  'exif:PixelXDimension': number;
  'exif:ApertureValue': string;
  'exif:WhiteBalance': number;
  AssetID: number;
  'exif:ISOSpeedRatings_xmpArrayType': string;
  'dam:scene7UploadTimeStamp': string;
  'dam:Numberoftextualcomments': number;
  'tiff:BitsPerSample_xmpArrayType': string;
  'dam:scene7PublishTimeStamp': string;
  ImageRank: number;
  'dam:scene7JobStartDate': number;
  'xmp:ModifyDate': string;
  'photoshop:Headline': string;
  'exif:ExposureProgram': number;
  'tiff:BitsPerSample': number[];
  'xmp:CreateDate': string;
  'tiff:ImageWidth': number;
  'dam:scene7Domain': string;
  'dam:scene7Folder': string;
  'dc:date': number[];
  'exifEX:LensSpecification_xmpArrayType': string;
  'exif:DateTimeOriginal': string;
  'dam:sha1': string;
  'dam:size': number;
  'tiff:Model': string;
  'exif:FocalPlaneYResolution': string;
  'dam:scene7APIServer': string;
  'exif:MeteringMode': number;
  'photoshop:AuthorsPosition': string;
  'dc:creator_xmpArrayType': string;
  'tiff:SamplesPerPixel': number;
  'xmpRights:WebStatement': string;
  'exif:SceneCaptureType': number;
  'dc:title': string;
  'tiff:PhotometricInterpretation': number;
  'dam:scene7LastModified': number;
}

export interface Related {
  'jcr:primaryType': string;
}

export interface Renditions {
  'jcr:primaryType': string;
  'jcr:createdBy': string;
  'jcr:created': string;
}
