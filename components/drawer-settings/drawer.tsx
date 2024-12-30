'use client';

import { useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
    DrawerContent,
    DrawerHeader,
    DrawerTitle
} from "@/components/ui/drawer";
import classes from './drawer.module.css';
import AvatarContext from "@/components/avatar/avatar-context";
import { Separator } from "@/components/ui/separator";
import { IconSquareRoundedPlus } from "@tabler/icons-react";
import FontSelector from "@/components/font-selector/font-selector";
import VolumeSliderComponent from "@/components/slider-volume/slider";
import ThemeSelector from "@/components/theme-selector/theme-selector";
import ToneSelector from "@/components/tone-selector/tone-selector";
import { Button } from "@/components/ui/button";
import {saveToIndexedDB} from "@/utils/database/indexed-settings-db";

export default function DrawerComponentSettings() {
    const { isCollapse, setIsCollapse, background, setBackground, savedFile, setSavedFile } = useContext(AvatarContext);
    const [error, setError] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: async (acceptedFiles, rejectedFiles) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                setError(null);
                const reader = new FileReader();

                reader.onloadend = () => {
                    const fileUrl = reader.result;
                    setBackground(fileUrl);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    setSelectedFile(fileUrl as string);
                    setSavedFile(fileUrl as string);
                    saveToIndexedDB("backgroundImage", file); // Use reusable function
                };
                reader.readAsDataURL(file);
            }
            if (rejectedFiles.length > 0) {
                setError("Only image files are accepted.");
            }
        }
    });

    const toggleCollapse = () => {
        setIsCollapse(!isCollapse);
    };

    const handleSetBackground = (imageName: string) => {
        setBackground(imageName);
    };

    const backgroundImages = [
        "/bg/background1.png",
        "/bg/background2.png",
        "/bg/background3.png",
        "/bg/background4.png",
    ];

    return (
        <DrawerContent isCollapse={isCollapse}>
            <DrawerHeader>
                <DrawerTitle>Settings</DrawerTitle>
            </DrawerHeader>
            <div className={classes.container}>
                <div className={classes.wrapper}>
                    <div className={classes.item}>
                        <p>Background</p>
                        <img
                            src={background}
                            alt="background"
                            className={`rounded-md object-cover ${classes.toggleImg}`}
                            onClick={toggleCollapse}
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                    <div className={classes.item}>
                        <p>Font</p>
                        <FontSelector />
                    </div>
                    <div className={classes.item}>
                        <p>Volume</p>
                        <div className={classes.slider}>
                            <VolumeSliderComponent />
                        </div>
                    </div>
                    <div className={classes.item}>
                        <p>Gaya Bahasa</p>
                        <ToneSelector />
                    </div>
                    <div className={classes.item}>
                        <p>Tema</p>
                        <ThemeSelector />
                    </div>
                </div>
                {isCollapse && (
                    <>
                        <Separator orientation={"vertical"} />
                        <div
                            className={`${classes.background} overflow-y-auto`}
                            style={{ maxHeight: "calc(100vh - 100px)" }}
                        >
                            <Button
                                className={`${classes.upload} rounded-md`}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <IconSquareRoundedPlus style={{ fontSize: '32px', width: '32px', height: '32px' }} />
                            </Button>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                            {(savedFile || selectedFile) && (
                                <img
                                    src={savedFile || selectedFile}
                                    className={classes.img}
                                    onClick={() => handleSetBackground(savedFile || selectedFile)}
                                />
                            )}
                            {backgroundImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={`${image}`}
                                    alt={`Background ${index + 1}`}
                                    className={classes.img}
                                    onClick={() => handleSetBackground(image)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </DrawerContent>
    );
}
