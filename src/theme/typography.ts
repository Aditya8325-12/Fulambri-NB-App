import { FONT_FAMILY, FONT_SIZE } from '../constants/fonts';
import COLORS from '../constants/colors';

const TYPOGRAPHY = {
    // Tiny Text
    tiny: {
        fontSize: FONT_SIZE.xs,
        fontFamily: FONT_FAMILY.IRegular,
        color: COLORS.textMuted,
    },

    // Caption Text
    caption: {
        fontSize: FONT_SIZE.sm,
        fontFamily: FONT_FAMILY.IRegular,
        color: COLORS.textSecondary,
    },

    // Small Body
    bodySmall: {
        fontSize: FONT_SIZE.md,
        fontFamily: FONT_FAMILY.IRegular,
        color: COLORS.textNormal,
    },

    // Normal Body
    body: {
        fontSize: FONT_SIZE.base,
        fontFamily: FONT_FAMILY.IRegular,
        color: COLORS.textPrimary,
    },

    // Medium Body
    bodyMedium: {
        fontSize: FONT_SIZE.md,
        fontFamily: FONT_FAMILY.IMedium,
        color: COLORS.textNormal,
    },

    // Sub Heading
    subHeading: {
        fontSize: FONT_SIZE.lg,
        fontFamily: FONT_FAMILY.PSemiBold,
        color: COLORS.textPrimary,
    },

    // Card Heading
    cardHeading: {
        fontSize: FONT_SIZE.xl,
        fontFamily: FONT_FAMILY.PSemiBold,
        color: COLORS.textPrimary,
    },

    // Section Heading
    sectionHeading: {
        fontSize: FONT_SIZE.xxl,
        fontFamily: FONT_FAMILY.PBold,
        color: COLORS.textPrimary,
    },

    // Screen Title
    screenTitle: {
        fontSize: FONT_SIZE.title,
        fontFamily: FONT_FAMILY.PBold,
        color: COLORS.textPrimary,
    },

    // Hero Title
    heroTitle: {
        fontSize: FONT_SIZE.hero,
        fontFamily: FONT_FAMILY.PBold,
        color: COLORS.primary,
    },

    // Button Text
    button: {
        fontSize: FONT_SIZE.md,
        fontFamily: FONT_FAMILY.ISemiBold,
        color: COLORS.textPrimary,
    },

    // Input Text
    input: {
        fontSize: FONT_SIZE.md,
        fontFamily: FONT_FAMILY.IRegular,
        color: COLORS.textNormal,
    },

    // Placeholder
    placeholder: {
        fontSize: FONT_SIZE.base,
        fontFamily: FONT_FAMILY.IRegular,
        color: COLORS.textMuted,
    },
};

export default TYPOGRAPHY;